import { genid } from './default'

class BatchJob {
    constructor(storage, id, contacts, message, sendCountPerMin, startAt, onDoneCallback) {
        this.storage = storage
        this.id = id
        this.state = 'stop'
        var t = new Date()
        t.setTime(startAt)
        this.startAt = t
        this.totalSent = 0
        this.totalCount = contacts.length
        this.contacts = contacts
        this.message = message
        this.sendCountPerMin = sendCountPerMin
        this.onDoneCallback = onDoneCallback

        this._sendTimer = null
    }

    start() {
        this.resume()
    }

    stop() {
        this.state = 'stop'
        if (this._sendTimer != null) {
            window.clearInterval(this._sendTimer)
            this._sendTimer = null
        }
    }

    resume() {
        if (this.totalSent >= this.totalCount) {
            return false
        }
        this.state = 'running'
        if (this._sendTimer != null) {
            window.clearInterval(this._sendTimer)
        }
        var sendInt = (60.0 / this.sendCountPerMin) * 1000
        this._sendTimer = window.setInterval(() => {
            this._sendNext()
        }, sendInt)
        return true
    }

    _sendNext() {
        var c = this.contacts[this.totalSent]
        var text = this.message.replace(/\[name\]/g, c.name);
        if (window.waAPI) {
            try {
                window.waAPI.sendTextMessage(c.id, text);
            } catch (ex) { }
        }
        this.totalSent++
        this.storage.setValue("bat/" + this.id, this.totalSent)
        console.log("send text", c, text)
        if (this.totalSent >= this.totalCount) {
            this.stop()
            if (this.onDoneCallback) {
                this.onDoneCallback(this)
            }
        }
    }
}

export default class BatchManager {
    constructor(storage) {
        this.storage = storage
        this.runningJobs = {}
    }

    get contacts() {
        var vals = []
        if (!window.waAPI || !window.waAPI.Store) {
            return vals
        }

        var models = window.waAPI.Store.Contact._models
        for (let index = 0; index < models.length; index++) {
            var model = models[index]
            if (model.isMe || model.isGroup || !model.isUser) {
                continue
            }
            if (model.id.user == "0") {
                continue
            }
            let phoneNumber = model.id.toString().split('@')[0].split('-')[0]
            vals.push({
                id: model.id,
                phone: phoneNumber,
                name: model.displayName || ""
            })
        }
        return vals
    }

    async getJobs() {
        var vals = await this.storage.getValue('batjobs') || []
        var jobs = []
        for (let index = 0; index < vals.length; index++) {
            const v = vals[index];
            var job = new BatchJob(this.storage, v.id, v.contacts, v.message, v.sendCountPerMin, v.startAt, (j) => {
                this.runningJobs[j.id] = undefined
            })
            job.totalSent = await this.storage.getValue("bat/" + v.id) || 0
            if (this.runningJobs[v.id]) {
                job.state = 'running'
            }
            jobs.push(job)
        }
        return jobs
    }

    async startJob(contacts, message, sendCountPerMin) {
        var vals = await this.storage.getValue('batjobs') || []
        var id = genid()
        var startAt = new Date().getTime()
        vals.push({
            id,
            contacts,
            message,
            sendCountPerMin,
            startAt: startAt
        })

        await this.storage.setValue('batjobs', vals)
        var job = new BatchJob(this.storage, id, contacts, message, sendCountPerMin, startAt, (j) => {
            this.runningJobs[j.id] = undefined
        })
        job.start()
        this.runningJobs[id] = job
        return job
    }

    stopJob(jobId) {
        var job = this.runningJobs[jobId]
        if (job) {
            job.stop()
            this.runningJobs[jobId] = undefined
        }
    }

    async resumeJob(jobId) {
        var job = this.runningJobs[jobId]
        if (job) {
            return
        }
        var vals = await this.storage.getValue('batjobs') || []
        vals.forEach(v => {
            if (v.id == jobId) {
                var job = new BatchJob(this.storage, jobId, v.contacts, v.message, v.sendCountPerMin, v.startAt, (j) => {
                    this.runningJobs[j.id] = undefined
                })
                if (job.resume()) {
                    this.runningJobs[jobId] = job
                }
            }
        })
    }

    async removeJob(jobId) {
        this.stopJob(jobId)
        await this.storage.setValue("bat/" + jobId, undefined)
        var vals = await this.storage.getValue('batjobs') || []
        for (let index = 0; index < vals.length; index++) {
            const element = vals[index];
            if (element.id == jobId) {
                vals.splice(index, 1)
                break
            }
        }
        await this.storage.setValue('batjobs', vals)
    }
}