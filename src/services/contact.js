export class Contact {
    constructor(s, obj) {
        this.storage = s;
        this.obj = obj;
    }

    get uid() { return this.obj.uid }
    get displayName() { return this.obj.displayName }
    get noteName() { return this.obj.noteName }
    get avatar() { return this.obj.avatar }
    get gender() { return this.obj.gender }
    get email() { return this.obj.email }
    get phone() { return this.obj.phone }
    get location() { return this.obj.location }
    get note() { return this.obj.note }
    get star() { return this.obj.star }
    get group() { return this.obj.group }
    get isBusiness() { return this.obj.isBusiness }

    get whatsappUid() {
        return this.obj.whatsappUid
    }
    get whatsappPhone() { return this.obj.whatsappPhone }
    get instagramId() { return this.obj.instagramId }
    get facebookId() { return this.obj.facebookId }
    get weichatId() { return this.obj.weichatId }
    get createdAt() { return this.obj.createdAt }

    get tags() { return this.obj.tags }
    get logs() { return this.obj.logs }

    async addTag(tagId, tagName) {
        this.obj = await this.storage.addContactTag(this.obj.uid, tagId, tagName)
    }

    async delTag(tagId, tagName) {
        this.obj = await this.storage.delContactTag(this.obj.uid, tagId, tagName)
    }

    async setNote(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'note', val)
    }
    async setDisplayName(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'displayName', val)
    }

    async setNoteName(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'noteName', val)
    }

    async setGroup(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'group', val)
    }

    async setGender(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'gender', val)
    }

    async setPhone(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'phone', val)
    }
    async setEmail(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'email', val)
    }
    async setLocation(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'location', val)
    }
    async setStar(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'star', val)
    }
    async setIsBusiness(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'isBusiness', val)
    }
    async setAvatar(val) {
        this.obj = await this.storage.setContactField(this.obj.uid, 'avatar', val)
    }
}

class ContactManager {
    constructor(s) {
        this.storage = s
    }

    async getContact(waUid) {
        let storeObj = await this.storage.loadContact(waUid)
        return new Contact(this.storage, storeObj)
    }
}

export default ContactManager;