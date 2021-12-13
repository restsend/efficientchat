<template>
  <div class="group-chat">
    <div class="user">
      <div
        v-if="!groupContact || !groupContact.avatar"
        class="user-img el-icon-user-solid"
      ></div>
      <div v-if="groupContact && groupContact.avatar" class="user-img">
        <img
          :src="groupContact.avatar"
          alt=""
          style="width: 100%; height: 100%"
        />
      </div>
      <div class="user-name">
        <div class="left">
          <div class="noteName">
            <p v-show="!isName">
              {{ user.noteName ? user.noteName : user.displayName }}
            </p>
            <el-input
              v-show="isName"
              v-model="user.noteName"
              @change="saveName"
              @blur="loseSaveName"
              ref="name"
            ></el-input>
            <div class="img" @click="editName">
              <img class="editName" src="@/images/editor.svg" alt="" />
            </div>
          </div>
          <div class="name">
            {{ user.displayName ? user.displayName : "userName" }}
          </div>
        </div>
        <div class="right">
          <i
            @click="Collection"
            :class="{
              'el-icon-star-on': isCollection,
              'el-icon-star-off': !isCollection,
            }"
          ></i>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="user-information">
        <dl>
          <dt>
            <i class="el-icon-discount" style="font-size: 20px"></i>
          </dt>
          <dd style="border: none">
            <div class="label">
              <div class="tag">
                <el-tag
                  :key="tag.name"
                  v-for="tag in tags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  :color="tag.bgColor"
                  :style="{ borderColor: tag.bgColor }"
                  style="color: #fff"
                >
                  {{ tag.name }}
                </el-tag>

                <div class="add">
                  <el-button
                    data-v-08ad2951=""
                    type="button"
                    class="
                      el-button
                      button-new-tag
                      el-button--default el-button--small
                    "
                    icon="el-icon-plus"
                  >
                  </el-button>
                  <el-select
                    popper-class="dropLabelSet"
                    :popper-append-to-body="false"
                    v-model="tagIds"
                    multiple
                    @visible-change="visible($event)"
                  >
                    <el-input
                      class="tagsearch"
                      v-model="user.tagKeyword"
                      @input="tagsearch"
                    ></el-input>

                    <el-option-group
                      v-for="group in labelSet"
                      :key="group.id"
                      :label="group.name"
                    >
                      <el-option
                        v-for="item in group.tags"
                        :key="item.value"
                        :label="item.name"
                        :value="item.id"
                        @click.native="save(item)"
                      >
                      </el-option>
                    </el-option-group>
                  </el-select>
                </div>
              </div>
            </div>
          </dd>
        </dl>

        <dl class="note-content">
          <dt>
            <i class="el-icon-notebook-2" style="font-size: 20px"></i>
          </dt>
          <dd style="border: none">
            <el-input
              :disabled="!isNote"
              :class="{ uncheck: !isNote }"
              type="textarea"
              :rows="2"
              v-model="user.note"
              resize="none"
              @change="saveNote"
              @blur="loseSaveNote"
              ref="note"
            >
            </el-input>
            <div class="img" @click="editNote">
              <img src="@/images/editor.svg" alt="" />
            </div>
          </dd>
        </dl>
      </div>

      <span class="title" v-if="noteRecords.length !== 0">Activities</span>
      <div class="noteRecords" v-if="noteRecords.length !== 0">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(noteRecord, index) in noteRecords"
            :key="index"
          >
            <div class="timeline-content">
              <div class="timeline-content-title">
                <p v-html="noteRecord.content"></p>
                <span>{{ noteDate(noteRecord.createdAt) }}</span>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import TimeAgo from "javascript-time-ago";

export default {
  name: "group-chat",
  props: { groupContact: Object },
  data() {
    return {
      user: {
        note: "",
        noteName: "",
        userName: "",
        tagKeyword:"",
      },
      labelListKeyword: "",
      showHeight: false,
      labelSet: [],
      initLabelSet: [],
      tagIds: [],
      tags: [],
      noteRecords: [],
      reverse: true,
      isNote: false,
      isName: false,
      isCollection: false,
    };
  },
  watch: {
    async tagIds(val) {
      this.tags = await this.$root.clip.tag.renderTags(val);
    },
  },
  async mounted() {
    this.contact();
  },
  methods: {
    async contact() {
      this.tagIds = [];
      var contact = await this.$root.clip.contact.getContact(
        this.groupContact.uid
      );

      this.user.noteName = contact.noteName
        ? contact.noteName
        : contact.displayName;
      this.user.displayName = contact.displayName;
      this.user.note = contact.note;
      if (contact.logs) {
        this.noteRecords = contact.logs.reverse();
      }

      if (contact.tags) {
        for (let i = 0; i < Object.keys(contact.tags).length; i++) {
          if (contact.tags[Object.keys(contact.tags)[i]]) {
            this.tagIds.push(Object.keys(contact.tags)[i]);
          }
        }
        this.tags = await this.$root.clip.tag.renderTags(this.tagIds);
      }
    },
    editName() {
      this.isName = true;
      setTimeout(() => {
        this.$refs.name.$el.children[0].focus();
      }, 0);
    },
    async saveName() {
      await this.groupContact.setNoteName(this.user.noteName);
      this.isName = false;
      this.contact();
    },
    loseSaveName(){
      this.isName = false;
    },
    async Collection() {
      this.isCollection = !this.isCollection;
      await this.groupContact.setStar(this.isCollection);
      this.contact();
    },
    //Get tabular data
    async visible(event) {
      if (event) {
        this.labelSet = await this.$root.clip.tag.getGroups();
        this.initLabelSet = await this.$root.clip.tag.getGroups();
      }
    },
    //Remove the tag
    async handleClose(tag) {
      await this.groupContact.delTag(tag.id, tag.name);
      this.contact();
    },
    //User Adds labels
    async save(item) {
      if (this.tagIds.indexOf(item.id) === -1) {
        await this.groupContact.delTag(item.id, item.name);
      } else {
        //Add tags
        await this.groupContact.addTag(item.id, item.name);
      }
      this.contact();
    },
    //Editors note
    editNote() {
      this.isNote = true;
      setTimeout(() => {
        this.$refs.note.$el.children[0].focus();
      }, 0);
    },
    async saveNote() {
      this.isNote = false;
      await this.groupContact.setNote(this.user.note);
      this.contact();
    },
    loseSaveNote(){
      this.isNote = false;
    },
    tagsearch() {
      this.labelSet = [];
      this.initLabelSet.forEach((element) => {
        let flag = false;
        element.tags.forEach((e) => {
          if (
            e.name.toLowerCase().indexOf(this.user.tagKeyword.toLowerCase()) !== -1
          ) {
            flag = true;
          }
        });
        if (flag) {
          this.labelSet.push(element);
        }
      });
    },
  },
  computed: {
    noteDate() {
      return (date) => {
        const timeAgo = new TimeAgo("en-US");
        return timeAgo.format(Date.parse(date));
      };
    },
  },
};
</script>

<style lang="less" scoped>
.group-chat {
  width: 100%;
  height: 100%;
  .user {
    padding: 10px 20px;
    background-color: var(--panel-header-background);
    height: 59px;
    display: flex;
    align-items: center;
    border-left: 1px solid var(--border-stronger);
    .user-img {
      width: 38px;
      height: 38px;
      background-color: #e5e5e5;
      color: #fff;
      font-size: 25px;
      border-radius: 50%;
      margin-right: 10px;
      display: flex;
      align-content: center;
      justify-content: center;
      overflow: hidden;
    }
    .user-img::before {
      display: flex;
      align-items: center;
    }
    .user-name {
      width: calc(100% - 48px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        .noteName {
          color: rgba(80, 80, 80, 1);
          font-size: 16px;
          margin-bottom: 1px;
          display: flex;
          .img {
            width: 20px;
            margin-left: 10px;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img {
              width: 16px;
              height: 16px;
            }
          }
          p {
            margin: 0 0 5px;
          }
          .el-input {
            width: 100px;
            padding: 0;
            /deep/ .el-input__inner {
              padding: 0;
              height: 23px;
              border: none;
              background-color: transparent;
              border-bottom: 1px solid #e5e5e5;
            }
          }
        }
        .noteName:hover .img {
          opacity: 1;
        }
        .name {
          color: rgba(166, 166, 166, 1);
          font-size: 14px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .content::-webkit-scrollbar {
    width: 5px !important;
  }
  .content {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px 20px 24px;
    height: calc(100% - 59px);
    overflow-x: hidden;
    .user-information {
      dl {
        margin: 0 0 15px;
        display: flex;
        dt {
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 20px;
          color: rgba(80, 80, 80, 1);
          font-size: 14px;
        }
        dd {
          width: calc(100% - 50px);
          margin-left: 0;
          border-bottom: 1px solid #e5e5e5;
          display: flex;
          .el-textarea {
            position: static;
            /deep/ textarea {
              cursor: default;
            }
          }
          .tag {
            min-height: 30px;
            display: flex;
            flex-wrap: wrap;
            // align-items: center;
            span {
              height: 24px;
            }
            .el-tag {
              width: auto;
              margin-right: 10px;
              margin-bottom: 5px;
              line-height: 22px;
              /deep/ .el-icon-close {
                color: #fff;
              }
              /deep/ .el-icon-close:hover {
                background-color: transparent;
              }
              .el-button {
                margin-bottom: 5px;
              }
            }
            .button-new-tag {
              height: 24px;
              line-height: 22px;
              padding: 0 10px;
              span {
                height: 24px;
              }
            }
          }
          .img {
            width: 20px;
            margin-left: 10px;
            opacity: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            img {
              width: 16px;
              height: 16px;
            }
          }
        }
        dd:hover .img {
          opacity: 1;
        }
      }
      dl.note-content {
        height: 51px;
        dt {
          align-items: center;
          line-height: 25px;
        }
      }
    }
    .title {
      width: 100%;
      height: 22px;
      line-height: 22px;
      margin-bottom: 6px;
      margin-top: 24px;
      text-align: left;
      font-weight: 700;
      font-size: 14px;
      color: #6c757d;
    }

    .label {
      width: 100%;
      min-height: 33px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      transform: translate3d(0, 0, 0);
      .add {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        // margin-top: 17px;
        color: #727cf5;
        font-size: 14px;
        cursor: pointer;
        margin-bottom: 5px;
        // background-color: red;
        position: relative;
        i {
          margin-right: 5px;
        }
        button {
          width: 30px;
          padding: 0 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0;
          span {
            // display: block;
            // height: 100%;
            margin-right: 0px;
            width: auto;
            line-height: 24px;
          }
        }
        .el-select {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          // opacity: 0;
          /deep/ .el-select__tags {
            display: none;
          }
          /deep/ .el-input {
            display: none;
          }
          /deep/ .tagsearch {
            display: block;
            width: 230px;
            margin-left: 10px;
            margin-bottom: 10px;
          }
        }
      }
    }

    .noteRecords::-webkit-scrollbar {
      width: 5px !important;
    }
    .noteRecords {
      text-align: left;
      font-size: 14px;
      border-radius: 4px;
      padding-top: 20px;
      color: #505050;
      z-index: -1;
      height: calc(100% - 167px); //386px  478px
      min-height: 100px;
      overflow-x: hidden;
      .el-timeline {
        padding-left: 2px;
        z-index: -1;
        position: relative;
        /deep/ .el-timeline-item__wrapper {
          top: 0;
        }
      }
      .timeline-content {
        .timeline-content-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          p {
            font-size: 14px;
          }
        }
      }
      p {
        color: rgba(56, 56, 56, 1);
        font-size: 14px;
        margin-bottom: 0;
        margin-top: 0;
        padding: 0 0 0 0;
      }
    }
  }
}
</style>
