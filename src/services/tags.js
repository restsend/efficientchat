class TagManager {
    constructor(s) {
        this.storage = s
    }

    async renderTags(tagIds) {
        let groups = await this.getGroups()
        let tags = []

        //TODO: optimize loop
        groups.forEach(g => {
            g.tags.forEach(t => {
                tagIds.forEach(id => {
                    if (id == t.id) {
                        tags.push(t)
                    }
                })
            })
        });
        return tags
    }

    async getGroups() { return await this.storage.getTagGroups() }
    async addGroup(name, pos) { return await this.storage.addTagGroup(name, pos) }
    async delGroup(groupId) { return await this.storage.delTagGroup(groupId) }
    async editGroup(groupId, name, pos) { return await this.storage.editTagGroup(groupId, name, pos) }

    async tags(groupId) { return await this.storage.getTags(groupId) }
    async addTag(groupId, name, fontColor, bgColor, pos) { return await this.storage.addTag(groupId, name, fontColor, bgColor, pos) }
    async editTag(groupId, tagId, name, fontColor, bgColor, pos) { return await this.storage.editTag(groupId, tagId, name, fontColor, bgColor, pos) }
    async delTag(groupId, tagId) { return await this.storage.delTag(groupId, tagId) }
}

export default TagManager
