class WAExtApi {
    constructor() {
        this.makeStore()
    }

    get isReady() {
        return this.Store != undefined
    }

    get meId() {
        if (!this.Store || !this.Store.Contact) {
            return ""
        }

        for (let index = 0; index < this.Store.Contact._models.length; index++) {
            const x = this.Store.Contact._models[index];
            if (x.isMe) {
                return window.btoa(x.id.toString())
            }
        }
        return ""
    }

    makeStore() {
        let tag = new Date().getTime();

        let neededObjects = [
            { id: "Store", conditions: (module) => (module.default && module.default.Chat && module.default.Msg) ? module.default : null },
            { id: "MediaCollection", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.processAttachments) ? module.default : null },
            { id: "MediaProcess", conditions: (module) => (module.BLOB) ? module : null },
            { id: "Wap", conditions: (module) => (module.createGroup) ? module : null },
            { id: "ServiceWorker", conditions: (module) => (module.default && module.default.killServiceWorker) ? module : null },
            { id: "State", conditions: (module) => (module.STATE && module.STREAM && module.default._listeningTo && module.default._listeningTo.l2) ? module.default._listeningTo.l2 : null },
            { id: "WapDelete", conditions: (module) => (module.sendConversationDelete && module.sendConversationDelete.length == 2) ? module : null },
            { id: "Conn", conditions: (module) => (module.default && module.default.ref && module.default.refTTL) ? module.default : null },
            { id: "WapQuery", conditions: (module) => (module.queryExist) ? module : ((module.default && module.default.queryExist) ? module.default : null) },
            { id: "CryptoLib", conditions: (module) => (module.decryptE2EMedia) ? module : null },
            { id: "OpenChat", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.openChat) ? module.default : null },
            { id: "UserConstructor", conditions: (module) => (module.default && module.default.prototype && module.default.prototype.isServer && module.default.prototype.isUser) ? module.default : null },
            { id: "SendTextMsgToChat", conditions: (module) => (module.sendTextMsgToChat) ? module.sendTextMsgToChat : null },
            { id: "SendSeen", conditions: (module) => (module.sendSeen) ? module.sendSeen : null },
            { id: "sendDelete", conditions: (module) => (module.sendDelete) ? module.sendDelete : null }
        ];

        var chunk = window.webpackChunkbuild || window.webpackChunkwhatsapp_web_client;
        if (chunk == undefined) {
            return
        }

        chunk.push([
            ["rshelper" + tag], {},
            e => {
                Object.keys(e.m).forEach(mod => {
                    const res = e(mod)
                    if (!res) {
                        return;
                    }
                    neededObjects.forEach(n => {
                        if (!n.matchMod) {
                            n.matchMod = n.conditions(res)
                        }
                    })
                })
            }
        ])

        this.Store = neededObjects[0].matchMod;
        if (!this.Store) {
            console.log("not found Store Module");
            return
        }

        neededObjects.splice(0, 1);
        neededObjects.forEach(n => {
            if (n.matchMod) {
                this.Store[n.id] = n.matchMod;
            }
        });
        this._initEvents();
    }

    _initEvents() {
        this.onOpenChat = function (e) { }
        this.onAddMsg = function (e) { }

        this.Store.State.on("open_chat", (e) => {
            try {
                this.onOpenChat(e);
            } catch (exc) {
                console.log("openchat:", exc);
            }
        });

        this.Store.Msg.on("add", (e) => {
            if (!e.isNewMsg || e.isSentByMe || e.isGroupMsg || e.isMedia || e.isGif) {
                return
            }

            try {
                this.onAddMsg(e);
            } catch (exc) {
                console.log("addmsg:", exc);
            }
        });
    }

    _getModelById(models, id) {
        for (let index = 0; index < models.length; index++) {
            const x = models[index];
            if (x.hasOwnProperty("__x_id") && x.__x_id == id) {
                return x;
            }
        }
    }
    //
    //
    getContactInfo(user_id) {
        let contacts = this.Store.Contact.models;
        return this._getModelById(contacts, user_id);
    }

    sendTextMessage(chat_id, message_text, callback) {
        let chats = this.Store.Chat.models;
        let chat = this._getModelById(chats, chat_id);

        if (!chat) {
            return
        }

        this.Store.SendTextMsgToChat(chat, message_text).then(e => {
            if (callback) {
                callback(e)
            }
        });
    }

}
try {
    window.waAPI = new WAExtApi();
    console.log("init EfficientChat https://restsend.com/?from=debug_console")
} catch (e) {
    console.log(e)
}