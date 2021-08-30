import initClipValue from "./default"

class CRMLocalStorage {
    constructor(clipId) {
        this.clipId = clipId
        this.prefix = 'rscrm'
        if (this.clipId) {
            this.prefix += `/${clipId}`
        }

        let clipValue = localStorage.getItem(this.prefix)
        if (clipValue == undefined) {
            clipValue = initClipValue()
            localStorage.setItem(this.prefix, JSON.stringify(clipValue))
        }
    }

    _genid(size) {
        return Math.random().toString(16).substr(2, size);
    }

    async loadContact(uid) {
        const k = this.prefix + "/u/" + uid
        let obj = localStorage.getItem(k)
        if (obj == undefined) {
            obj = {
                uid: uid,
                createdAt: new Date()
            }
            localStorage.setItem(k, JSON.stringify(obj))
            this._saveValue("u/" + uid, 1)
            obj.createNew = true
            return obj
        }
        return JSON.parse(obj)
    }

    _saveContact(uid, obj) {
        const k = this.prefix + "/u/" + uid
        localStorage.setItem(k, JSON.stringify(obj))
        return obj
    }

    _loadValue(k) {
        let value = localStorage.getItem(this.prefix)
        if (value != null) {
            return JSON.parse(value)[k]
        }
        return undefined
    }

    _saveValue(k, val) {
        let clipValue = localStorage.getItem(this.prefix)
        if (clipValue == undefined) {
            clipValue = {}
        } else {
            clipValue = JSON.parse(clipValue)
        }
        clipValue[k] = val
        localStorage.setItem(this.prefix, JSON.stringify(clipValue))
    }

    // value
    async getValueEnabled(key) {
        const k = "e/" + key
        return this._loadValue(k)
    }

    async setValueEnabled(key, val) {
        const k = "e/" + key
        return this._saveValue(k, val)
    }

    async getValue(key) {
        const k = "v/" + key
        return this._loadValue(k)
    }

    async setValue(key, value) {
        const k = "v/" + key
        return this._saveValue(k, value)
    }

    // tag
    async getTagGroups() {
        const k = "t"
        return this._loadValue(k) || []
    }

    async addTagGroup(name, pos) {
        const k = "t"
        let groups = this._loadValue(k) || []

        let group = {
            id: this._genid(),
            name: name,
            tags: [],
        }

        groups.splice(pos, 0, group)
        this._saveValue(k, groups)
        return group
    }

    _lookup(items, id) {
        let pos = -1
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (element.id == id) {
                pos = index
                break
            }
        }
        return pos
    }

    async delTagGroup(groupId) {
        const k = "t"
        let groups = this._loadValue(k) || []
        let pos = this._lookup(groups, groupId)
        if (pos >= 0) {
            groups.splice(pos, 1)
        }

        this._saveValue(k, groups)
        return
    }

    async editTagGroup(groupId, name, newPos) {
        const k = "t"
        let groups = this._loadValue(k) || []
        let pos = this._lookup(groups, groupId)
        if (pos < 0) {
            return
        }

        let group = groups[pos]

        if (name) {
            group.name = name
        }

        if (newPos && newPos != pos) {
            groups.splice(pos, 1)
            groups.splice(newPos, 0, group)
        }
        this._saveValue(k, groups)
        return group
    }

    async getTags(groupId) {
        const k = "t"
        let groups = this._loadValue(k) || []
        let pos = this._lookup(groups, groupId)
        if (pos < 0) {
            return
        }
        return groups[pos].tags
    }

    async addTag(groupId, name, fontColor, bgColor, newPos) {
        const k = "t"
        let groups = this._loadValue(k) || []
        let pos = this._lookup(groups, groupId)
        if (pos < 0) {
            return
        }

        let group = groups[pos]
        let newTag = {
            id: this._genid(),
            name: name,
            fontColor: fontColor,
            bgColor: bgColor
        }
        group.tags.splice(newPos, 0, newTag)
        this._saveValue(k, groups)
        return newTag
    }

    async editTag(groupId, tagId, name, fontColor, bgColor, newPos) {
        const k = "t"
        let groups = this._loadValue(k) || []
        let pos = this._lookup(groups, groupId)
        if (pos < 0) {
            return
        }

        let group = groups[pos]
        pos = this._lookup(group.tags, tagId)
        if (pos < 0) {
            return
        }

        let tag = group.tags[pos]
        if (name) {
            tag.name = name
        }

        if (fontColor) {
            tag.fontColor = fontColor
        }

        if (bgColor) {
            tag.bgColor = bgColor
        }
        if (newPos && pos != newPos) {
            group.tags.splice(pos, 1)
            group.tags.splice(newPos, 0, tag)
        }
        this._saveValue(k, groups)
        return tag
    }

    async delTag(groupId, tagId) {
        const k = "t"
        let groups = this._loadValue(k) || []
        let pos = this._lookup(groups, groupId)
        if (pos < 0) {
            return
        }

        let group = groups[pos]
        pos = this._lookup(group.tags, tagId)
        if (pos < 0) {
            return
        }

        group.tags.splice(pos, 1)
        this._saveValue(k, groups)
    }

    // contact
    _addContactLog(obj, content) {
        let logs = obj['logs'] || []
        let v = {
            content: content,
            createdAt: new Date(),
        }

        logs.splice(0, 0, v)
        obj['logs'] = logs
        return obj
    }

    _addContactTag(obj, tagId) {
        let tags = obj['tags'] || {}
        tags[tagId] = 1
        obj['tags'] = tags
        return obj
    }

    _delContactTag(obj, tagId) {
        let tags = obj['tags'] || {}
        tags[tagId] = undefined
        obj['tags'] = tags
        return obj
    }

    async addContactTag(uid, tagId, tagName) {
        let obj = await this.loadContact(uid)
        this._addContactTag(obj, tagId)
        this._addContactLog(obj, `Add tag : <span class="tag">${tagName}</span>`)
        return this._saveContact(uid, obj)
    }

    async delContactTag(uid, tagId, tagName) {
        let obj = await this.loadContact(uid)
        this._delContactTag(obj, tagId)
        this._addContactLog(obj, `Removed tag : <span class="tag">${tagName}</span>`)
        return this._saveContact(uid, obj)
    }

    async setContactField(uid, field, val) {
        let obj = await this.loadContact(uid)
        obj[field] = val
        if (field == "note") {
            this._addContactLog(obj, `Note: <span class="note">${val.substr(0, 20)}</span>`)
        }
        return this._saveContact(uid, obj)
    }
}

export default CRMLocalStorage