<template>
  <div class="index" ref="index">
    <div v-if="true" class="user">
      <div
        v-if="!userContact || !userContact.avatar"
        class="user-img el-icon-user-solid"
      ></div>
      <div v-if="userContact && userContact.avatar" class="user-img">
        <img
          :src="userContact.avatar"
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
            <span class="sex">
              <template v-for="(item, index) in sexList">
                <img
                  style="width: 100%"
                  :key="index"
                  v-if="user.sex === item.value"
                  :src="item.icon"
                  alt=""
                />
              </template>
              <img
                style="width: 100%"
                v-if="!user.sex"
                src="@/images/unknown.png"
                alt=""
              />

              <el-select popper-class="dropSet" v-model="user.sex">
                <el-option
                  v-for="item in sexList"
                  :key="item.value"
                  :value="item.value"
                >
                  <img
                    style="width: 16px; height: 16px; margin-right: 5px"
                    :src="item.icon"
                    alt=""
                  />
                  <span>{{ item.label }}</span>
                </el-option>
              </el-select>
            </span>
          </div>
        </div>
        <div class="right">
          <i
            @click="Collection"
            style="display: block; width: 20px; height: 20px"
          >
            <img
              style="width: 100%"
              v-if="!isCollection"
              src="@/images/shouchang.svg"
              alt=""
            />
            <img
              style="width: 100%"
              v-if="isCollection"
              src="@/images/shouchang1.svg"
              alt=""
            />
          </i>
        </div>
      </div>
    </div>

    <div v-if="true" class="content">
      <div class="user-information">
        <dl class="input">
          <dt>
            <i class="el-icon-mobile-phone" style="font-size: 20px"></i>
          </dt>
          <dd>
            <span v-if="!isTel">{{ user.tel }}</span>
            <el-input
              v-show="isTel"
              v-model="user.tel"
              @change="saveTel"
              @blur="loseSaveTel"
              ref="tel"
            ></el-input>
            <div class="img" @click="editTel">
              <img src="@/images/editor.svg" alt="" />
            </div>
          </dd>
        </dl>

        <dl class="input">
          <dt>
            <img src="@/images/email.svg" alt="" />
          </dt>
          <dd>
            <span v-if="!isEmail">{{ user.email }}</span>
            <el-input
              v-show="isEmail"
              v-model="user.email"
              @change="saveEmail"
              @blur="loseSaveEmail"
              ref="email"
            ></el-input>
            <div class="img" @click="editEmail">
              <img src="@/images/editor.svg" alt="" />
            </div>
          </dd>
        </dl>

        <dl class="input">
          <dt>
            <i class="el-icon-location" style="font-size: 20px"></i>
          </dt>
          <dd>
            <span v-if="!isLocation">{{ user.location }}</span>
            <el-input
              v-show="isLocation"
              v-model="user.location"
              @change="saveLocation"
              @blur="loseSaveLocation"
              ref="location"
            ></el-input>
            <div class="img" @click="editLocation">
              <img src="@/images/editor.svg" alt="" />
            </div>
          </dd>
        </dl>

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
                    transfer="true"
                    v-model="tagIds"
                    multiple
                    @visible-change="visible($event)"
                  >
                    <el-input
                      class="tagsearch"
                      v-model="tagKeyword"
                      @input="tagsearch"
                    ></el-input>
                    <!-- <input type="text"> -->

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
            <!-- <span v-if="!isNote">{{ user.note }}</span> -->
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
            :timestamp="noteDate(noteRecord.createdAt)"
          >
            <div class="timeline-content">
              <div class="timeline-content-title">
                <p v-html="noteRecord.content"></p>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <div class="null" v-if="false">
      <div class="img">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 48 48"
          fill="rgba(229, 229, 229, 1)"
        >
          <path
            d="M24 11.8c2.32 0 4.2 1.88 4.2 4.2s-1.88 4.2-4.2 4.2-4.2-1.88-4.2-4.2 1.88-4.2 4.2-4.2m0 18c5.95 0 12.2 2.91 12.2 4.2v2.2H11.8V34c0-1.29 6.25-4.2 12.2-4.2M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 18c-5.33 0-16 2.67-16 8v6h32v-6c0-5.33-10.67-8-16-8z"
          ></path>
          <path d="M0 0h48v48H0z" fill="none"></path>
        </svg>
      </div>

      <!-- <p>
        客户画像可以帮助企业完善的记录客户信息，帮助企业判断客户意向，精准运营客户，打造优质客户体验。
      </p> -->
    </div>
  </div>
</template>

<script>
import ChooseInput from "@/components/choose-input/choose-input.vue";
import componentLabel from "@/components/label/component-label.vue";

import TimeAgo from "javascript-time-ago";

export default {
  components: { componentLabel, ChooseInput },
  name: "index",
  props: { userContact: Object },
  data() {
    return {
      user: {
        tel: "",
        email: "",
        location: "",
        note: "",
        label: "",
        sex: "",
        noteName: "",
        userName: "",
      },
      sexList: [
        {
          value: "male",
          label: "Male",
          icon: require("@/images/male.png"),
        },
        {
          value: "female",
          label: "Female",
          icon: require("@/images/female.png"),
        },
        {
          value: "other",
          label: "Unknown",
          icon: require("@/images/unknown.png"),
        },
      ],
      labelListKeyword: "",
      showHeight: false,
      labelSet: [],
      initLabelSet: [],
      tagIds: [],
      tags: [],
      noteRecords: [],
      reverse: true,
      isLabelContent: true,
      isEmail: false,
      isTel: false,
      isLocation: false,
      isNote: false,
      isName: false,
      isSex: false,
      isCollection: false,
      tagKeyword: "",
    };
  },
  watch: {
    async tagIds(val) {
      this.tags = await this.$root.clip.tag.renderTags(val);
    },
    async "user.sex"() {
      await this.userContact.setGender(this.user.sex);
    },
  },
  async mounted() {
    this.contact();
  },
  methods: {
    async contact() {
      this.tagIds = [];
      var contact = await this.$root.clip.contact.getContact(
        this.userContact.uid
      );
      this.user.noteName = contact.noteName
        ? contact.noteName
        : contact.displayName;
      this.user.displayName = contact.displayName;
      this.user.email = contact.email;
      this.user.tel = contact.phone;
      this.user.location = contact.location;
      this.user.note = contact.note;
      this.user.sex = contact.gender;
      this.isCollection = contact.star;
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
      await this.userContact.setNoteName(this.user.noteName);
      this.isName = false;
      this.contact();
    },
    loseSaveName(){
      this.isName = false;
    },

    async Collection() {
      this.isCollection = !this.isCollection;
      await this.userContact.setStar(this.isCollection);
      this.contact();
    },

    async visible(event) {
      if (event) {
        this.labelSet = await this.$root.clip.tag.getGroups();
        this.initLabelSet = await this.$root.clip.tag.getGroups();
      }
    },
    async handleClose(tag) {
      await this.userContact.delTag(tag.id, tag.name);
      this.contact();
    },
    async save(item) {
      if (this.tagIds.indexOf(item.id) === -1) {
        await this.userContact.delTag(item.id, item.name);
      } else {
        //Add tags
        await this.userContact.addTag(item.id, item.name);
      }
      this.contact();
    },

    editTel() {
      this.isTel = true;
      setTimeout(() => {
        this.$refs.tel.$el.children[0].focus();
      }, 0);
    },
    async saveTel() {
      await this.userContact.setPhone(this.user.tel);
      this.isTel = false;
      this.contact();
    },
    loseSaveTel() {
      this.isTel = false;
    },

    editEmail() {
      this.isEmail = true;
      setTimeout(() => {
        this.$refs.email.$el.children[0].focus();
      }, 0);
    },
    async saveEmail() {
      await this.userContact.setEmail(this.user.email);
      this.isEmail = false;
      this.contact();
    },
    loseSaveEmail(){
      this.isEmail = false;
    },

    editLocation() {
      this.isLocation = true;
      setTimeout(() => {
        this.$refs.location.$el.children[0].focus();
      }, 0);
    },
    async saveLocation() {
      await this.userContact.setLocation(this.user.location);
      this.isLocation = false;
      this.contact();
    },
    loseSaveLocation(){
      this.isLocation = false;
    },
    editNote() {
      this.isNote = true;
      setTimeout(() => {
        this.$refs.note.$el.children[0].focus();
      }, 0);
    },
    async saveNote() {
      await this.userContact.setNote(this.user.note);
      this.isNote = false;
      this.contact();
    },
    loseSaveNote(){
      this.isNote = false;
    },
    //
    tagsearch() {
      this.labelSet = [];
      this.initLabelSet.forEach((element) => {
        let flag = false;
        element.tags.forEach((e) => {
          if (e.name.toLowerCase().indexOf(this.tagKeyword.toLowerCase()) !== -1) {
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
.index {
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
          .sex {
            display: block;
            width: 16px;
            height: 16px;
            margin-left: 5px;
            position: relative;
            .el-select {
              width: 12px;
              height: 12px;
              background-color: red;
              position: absolute;
              left: 0;
              opacity: 0;
              /deep/ .el-input {
                background-color: red;
                width: 100%;
                height: 100%;
              }
              /deep/ .el-input__inner {
                display: none;
              }
              /deep/ .el-input__suffix {
                display: none;
              }
            }
          }
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
          span {
            width: calc(100% - 20px);
            height: 32px;
            line-height: 32px;
            text-align: left;
            font-size: 14px;
            opacity: default;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .tag {
            min-height: 30px;
            display: flex;
            flex-wrap: wrap;
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
            .input-new-tag {
              width: 90px;
              height: 24px;
              margin-bottom: 5px;
              vertical-align: bottom;
              /deep/ .el-input__inner {
                height: 100%;
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
      dl.input {
        .el-input {
          border: none;
          /deep/ .el-input__inner {
            border: none;
          }
        }
      }
      dl.note-content {
        height: 51px;
        dt {
          align-items: center;
          line-height: 25px;
        }
        dd {
          /deep/ .el-textarea__inner {
            background-color: #fff;
            padding-left: 5px;
            padding-right: 5px;
          }
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
        justify-content:center;
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
            margin-right: 0px;
            width: auto;
            line-height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .el-select {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
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
      height: calc(100% - 310px); //386px  478px
      min-height: 100px;
      overflow-x: hidden;
      .el-timeline {
        padding-left: 2px;
        z-index: -1;
        position: relative;
        /deep/ .el-timeline-item__wrapper {
          top: 0;
        }
        /deep/ .el-timeline-item__timestamp {
          font-size: 13px;
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