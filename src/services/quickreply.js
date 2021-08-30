const keyQuickReply = "QuickReply"

class QuickReplyManager {
    constructor(s) {
        this.storage = s
        this.prefix = keyQuickReply
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

export default QuickReplyManager