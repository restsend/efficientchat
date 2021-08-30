<template>
  <div class="wacrm-reply">
    <h3>
      Keyword Reply
      <el-switch
        v-model="isWacrmReply"
        :inactive-text="isWacrmReply ? 'ON' : 'OFF'"
      >
      </el-switch>
    </h3>
    <p>
      When a customer enters the keyword, the system will automatically reply
      and quickly respond to the customer's high-frequency questions.
    </p>

    <wacrm-reply-show
      @edit="edit"
      :replyData="replyData"
      v-if="replyName === 'wacrmReplyShow'"
      @replyName="replyNames"
      :style="{ opacity: isWacrmReply ? '1' : '0.5' }"
    />

    <wacrm-reply-edit
      :user="user"
      v-if="replyName === 'WacrmReplyEdit'"
      @replyName="replyNames"
      :style="{ opacity: isWacrmReply ? '1' : '0.5' }"
      :reply="reply"
      :pos="pos"
    />

    <div v-if="!isWacrmReply" class="bg"></div>
  </div>
</template>

<script>
import WacrmReplyEdit from "./wacrm-reply-edit.vue";
import wacrmReplyShow from "./wacrm-reply-show.vue";
export default {
  components: { wacrmReplyShow, WacrmReplyEdit },
  name: "wacrm-reply",
  props: { user: Object },
  data() {
    return {
      isWacrmReply: true,
      replyName: "wacrmReplyShow",
      replyData: null,
      reply: null,
      pos: -1,
    };
  },
  watch: {
    async isWacrmReply(val) {
      await this.$root.clip.autoReply.setEnabled(val);
    },
  },
  async mounted() {
    this.replyData = await this.$root.clip.autoReply.getMessages();
    this.isWacrmReply = await this.$root.clip.autoReply.getEnabled();
  },
  methods: {
    async replyNames(name) {
      this.replyName = name;
      this.reply = {};
      this.replyData = await this.$root.clip.autoReply.getMessages();
      this.pos = -1;
    },
    edit(item, index) {
      this.reply = item;
      this.replyName = "WacrmReplyEdit";
      this.pos = index;
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-reply {
  width: 100%;
  height: 100%;
  padding: 25px 10px 12px;
  position: relative;
  h3 {
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    color: rgba(80, 80, 80, 1);
    margin-bottom: 15px;
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-switch {
      margin-right: 20px;
      /deep/ .is-active {
        color: #303133;
      }
    }
  }
  p {
    font-size: 14px;
    font-weight: normal;
    color: #909399;
    margin-bottom: 13px;
    margin-top: 0;
    word-spacing:2px
  }
  .bg {
    width: 100%;
    height: calc(100% - 51px);
    position: absolute;
    top: 51px;
    left: 0;
  }
}
</style>