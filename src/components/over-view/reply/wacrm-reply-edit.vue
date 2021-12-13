<template>
  <div class="wacrm-reply-edit">
    <h3>Keywords(Multiple keywords are separated by commas.)</h3>
    <el-input
      type="text" 
      v-model="name"
      maxlength="15"
      show-word-limit
      :class="{ red: flag }"
    ></el-input>
    <p
      :style="{ opacity: flag ? 1 : 0 }"
      style="margin: 5px 0 5px; font-size: 12px; color: red"
    >
      Keyword name cannot be empty
    </p>

    <h3>Reply</h3>
    <div class="reply">
      <welcome-edit
        :welcomeText="reply.text"
        :user="user"
        @cancel="cancel"
        @confirm="confirm"
      />
    </div>
  </div>
</template>

<script>
import welcomeEdit from "../welcome/welcome-edit.vue";
import { AutoReplyMsg } from "@/services/autoreply";
export default {
  components: { welcomeEdit },
  name: "wacrm-reply-edit",
  props: { user: Object, reply: Object, pos: Number },
  data() {
    return {
      name: "",
      flag: false,
    };
  },
  created() {
    this.name = this.reply.keyword;
  },
  methods: {
    cancel() {
      this.$emit("replyName", "wacrmReplyShow");
    },
    async confirm(text) {
      if (this.name) {
        this.flag = false;
        if (text !== "") {
          let msg = new AutoReplyMsg(this.name, text);
          if (this.pos === -1) {
            await this.$root.clip.autoReply.setMessage(msg);
          } else {
            await this.$root.clip.autoReply.setMessage(msg, this.pos);
          }
          this.$emit("replyName", "wacrmReplyShow");
        }else{
          this.$message.error('Reply text cannot be empty');
        }
      }else{
        this.flag=true
      }

      
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-reply-edit {
  h3 {
    color: #505050;
    font-size: 14px;
    font-weight: normal;
    display: flex;
    align-items: center;
    margin-top: 13px;
    margin-bottom: 7px;
    span {
      color: #d43030;
      vertical-align: middle;
    }
  }
  .red {
    /deep/ .el-input__inner {
      border-color: red;
    }
    /deep/ .el-input__inner::-webkit-input-placeholder {
      color: red;
    }
  }
  .tag {
    .el-tag {
      margin-right: 10px;
      margin-bottom: 5px;
    }
    .button-new-tag {
      height: 24px;
      margin-right: 10px;
      line-height: 22px;
      padding: 0 10px;
    }
    .input-new-tag {
      width: 90px;
      vertical-align: bottom;
    }
  }
  .color {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 18px;
    margin-bottom: 31px;
    h3 {
      margin: 0;
    }
    div {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #505050;
        margin-left: 22px;
        display: flex;
        align-items: center;
        .el-color-picker {
          margin-left: 5px;
        }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>