const keyWelcome = "Welcome"
class WelcomeManager {
    constructor(s) {
        this.storage = s
        this.prefix = keyWelcome
    }

    async getMessage() {
        return await this.storage.getValue(this.prefix)
    }
    async getEnabled() {
        return await this.storage.getValueEnabled(this.prefix)
    }

    async setEnabled(val) {
        return await this.storage.setValueEnabled(this.prefix, val)
    }

    async setMessage(text) {
        return await this.storage.setValue(this.prefix, text)
    }

    async checkIsFirst(id) {
        let k = 'w/' + id
        let firstMsg = await this.storage.getValueEnabled(k)
        if (firstMsg != undefined) {
            return false
        }
        await this.storage.setValueEnabled(k, true)
        return true
    }

    async handleNewMsg(id) {
        if (!await this.getEnabled() || !window.waAPI) {
            return
        }

        let msg = await this.getMessage()
        if (msg == undefined) {
            return
        }
        window.waAPI.sendTextMessage(id, msg)
        return true
    }
}
export default WelcomeManager