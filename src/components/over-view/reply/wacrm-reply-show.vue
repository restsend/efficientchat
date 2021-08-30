<template>
  <div class="wacrm-reply-show">
    <div class="addLabel">
      <span @click.stop="addReply">Create</span>
    </div>

    <div class="header">
      <span>Keywords (reply texts)</span>
      <span>Operation</span>
    </div>

    <div class="main">
      <div class="grouping" v-for="(item, index) in keywords" :key="index">
        <div class="title">
          <span>{{ item.keyword }}</span>
          <div class="del">
            <el-popconfirm
              confirm-button-text="YES"
              cancel-button-text="NO"
              icon="el-icon-info"
              icon-color="red"
              title="Are you sure to delete the current keyword?"
              @confirm="delMessage($event, index)"
            >
              <span slot="reference">
                <span class="icon el-icon-delete" slot="reference"></span>
              </span>
            </el-popconfirm>
            <span @click.stop="editReply(item, index)">
              <span class="icon el-icon-edit"></span>
            </span>
          </div>
        </div>

        <div class="label">
          <p v-html="item.text">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wacrm-reply-show",
  props: { replyData: Array },
  data() {
    return {
      keywords: [],
    };
  },
  async created() {
    this.keywords = await this.$root.clip.autoReply.getMessages();
  },
  methods: {
    addReply() {
      this.$emit("replyName", "WacrmReplyEdit");
    },
    editReply(item, index) {
      this.$emit("edit", item, index);
    },
    async delMessage(index) {
      await this.$root.clip.autoReply.delMessage(index);
      this.keywords = await this.$root.clip.autoReply.getMessages();
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-reply-show {
  height: calc(100% - 95px);
  .addLabel {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 11px;
    span {
      display: block;
      width: 88px;
      height: 32px;
      border-radius: 3px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      background-color: #0acf97;
      border-color: #0acf97;
      box-shadow: 0 2px 6px 0 rgb(10 207 151 / 50%);
    }
    span:hover {
      color: #fff;
      background-color: #09b080;
      border-color: #08a679;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(245, 247, 250, 1);
    font-size: 14px;
    padding: 0 7px;
  }
  .grouping {
    margin-top: 12px;
    padding: 0 0 14px 7px;
    border-bottom: 1px solid #e5e5e5;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: rgba(80, 80, 80, 1);
      margin-bottom: 12px;
      .del {
        display: flex;
        align-items: center;
        span.icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 9px;
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        span.icon {
          color: #fff;
          background-color: #6c757d;
        }
        span.icon:hover {
          background-color: #2c343f;
        }
      }
    }
    .label {
      p {
        color: rgba(144, 147, 153, 1);
        background-color: rgba(244, 244, 245, 0);
        font-size: 14px;
        text-align: left;
      }
    }
  }
  .main{
    height: calc(100% - 93px);
    overflow-x: hidden;
  }
  .main::-webkit-scrollbar{
    width: 5px !important;
  }
}
</style>