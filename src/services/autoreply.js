const keyAutoReply = "AutoReply"

export class AutoReplyMsg {
    constructor(keyword, text) {
        this.keyword = keyword
        this.text = text
    }
}

export class AutoReplyManager {
    constructor(s) {
        this.storage = s
        this.prefix = keyAutoReply
    }

    async onNewMsg(id, body) {

        if (!await this.getEnabled() || !window.waAPI) {
            return false
        }
        let msgs = await this.getMessages()
        if (msgs.length <= 0) {
            return false
        }
        for (let index = 0; index < msgs.length; index++) {
            const element = msgs[index];

            let words = element.keyword.split(',')
            for (let wi = 0; wi < words.length; wi++) {
                const w = words[wi];
                if (body.search(new RegExp(w, "i")) < 0) {
                    continue
                }
                window.waAPI.sendTextMessage(id, element.text)
                return true
            }
        }
        return false
    }

    async getEnabled() {
        return await this.storage.getValueEnabled(this.prefix)
    }

    async setEnabled(val) {
        return await this.storage.setValueEnabled(this.prefix, val)
    }

    async getMessages() {
        let msgs = await this.storage.getValue(this.prefix)
        if (msgs == undefined) {
            return []
        }
        return msgs
    }

    async setMessage(msg, pos) {
        let msgs = await this.getMessages()
        if (pos == undefined || pos >= msgs.length) {
            msgs.splice(msgs.length, 0, msg)
        } else {
            msgs[pos] = msg
        }
        return await this.storage.setValue(this.prefix, msgs)
    }

    async delMessage(pos) {
        let msgs = await this.getMessages()
        if (msgs == undefined || msgs == null || msgs.length == 0) {
            return
        }
        msgs.splice(pos, 1)
        return await this.storage.setValue(this.prefix, msgs)
    }
}
export default AutoReplyManager