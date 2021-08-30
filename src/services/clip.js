import CRMLocalStorage from './local'
import TagManager from './tags'
import ContactManager from './contact'
import AutoReplyManager from './autoreply'
import QuickReplyManager from './quickreply'
import WelcomeManager from './welcome'
import BatchManager from './batch'

class Clip {
    constructor(clipId, s) {
        this.id = clipId
        this.storage = s
        if (this.storage == null) {
            this.storage = new CRMLocalStorage(clipId)
        }

        this.tag = new TagManager(this.storage)
        this.contact = new ContactManager(this.storage)
        this.autoReply = new AutoReplyManager(this.storage)
        this.quickReply = new QuickReplyManager(this.storage)
        this.welcome = new WelcomeManager(this.storage)
        this.batch = new BatchManager(this.storage)

        // Event
        this.onOpenUser = function (contact) { }
        this.onCloseUser = function (contact) { }

        this.onOpenGroup = function (contact) { }
        this.onCloseGroup = function (contact) { }

        // connect waAPI
        if (!window.waAPI || !window.waAPI.isReady) {
            console.log('restsend waapi not init.')
            return
        }

        window.waAPI.onOpenChat = (e) => {
            this._lastChatId = e.id
            if (e.isGroup) {
                this._on_open_group_chat(e)
            } else {
                this._on_open_user_chat(e)
            }
        }

        window.waAPI.onAddMsg = (e) => {
            if (!e.isGroupMsg && !e.isMedia) {
                this.autoReply.onNewMsg(e.chat.id, e.body).then((handle) => {
                    this.welcome.checkIsFirst(e.chat.id).then((isFirst) => {
                        if (!handle && isFirst) {
                            this.welcome.handleNewMsg(e.chat.id).then(() => { })
                        }
                    })
                })
            }
        }
    }
    //
    //send QuickReply to current chat
    sendQuickReply(text) {
        if (this._lastChatId == undefined) {
            return
        }
        window.waAPI.sendTextMessage(this._lastChatId, text)
    }

    async _init_profile(u, id, isGroup) {
        let c = window.waAPI.getContactInfo(id)
        if (u.obj.createNew) {
            u.obj.createNew = undefined
            await u.setGroup(isGroup)
            await u.setNoteName(c.displayName)

            let phoneNumber = u.uid.split('@')[0].split('-')[0]
            if (phoneNumber) {
                await u.setPhone(phoneNumber)
            }
        }
        await u.setDisplayName(c.displayName)
        await u.setAvatar(c.getProfilePicThumb().imgFull)
    }

    _on_open_group_chat(e) {
        this.contact.getContact(e.id.toString()).then((u) => {
            this._init_profile(u, e.id, true).then(() => {
                this.onOpenGroup(u)
            })
        })

    }
    _on_open_user_chat(e) {
        this.contact.getContact(e.id.toString()).then((u) => {
            this._init_profile(u, e.id, false).then(() => {
                this.onOpenUser(u)
            })
        })
    }
}

export default Clip;