<template>
  <div class="fastreply-add">
    <h2>
      Quick Reply
      <span
        ><i @click.stop="cancel">Cancel</i>
        <i @click.stop="confirm">Done</i></span
      >
    </h2>

    <div class="text" @click.stop="add()">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder=""
        v-model="textarea"
        resize="none"
        id="textarea"
        ref="add"
      >
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "fastreply-add",
  props: {
    fastreplyText: String,
    pos: Number,
  },
  data() {
    return {
      text: "",
      faceList: [],
      textarea: "",
    };
  },
  created() {
    if (this.fastreplyText) {
      this.textarea = this.fastreplyText.replace(/<(?!\/?br\/?.+?>)[^<>]*>/g,"");
    }
  },
  mounted() {
    this.$refs.add.focus();
  },
  methods: {
    cancel() {
      this.$emit("fastreplyName", "fastreplyShow");
    },
    add() {
      this.$refs.add.focus();
    },
    async confirm() {
      if (this.textarea) {
        this.textarea = "<pre>" + this.textarea + "</pre>";
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        this.textarea = this.textarea.replace(
          reg,
          "<a target='_blank' href='$1$2'>$1$2</a>"
        );
        if (this.pos === -1) {
          await this.$root.clip.quickReply.setMessage(this.textarea);
        } else {
          await this.$root.clip.quickReply.setMessage(this.textarea, this.pos);
        }
      } else {
        this.$message.error("Reply text can not empty");
      }

      this.$emit("fastreplyName", "fastreplyShow");
    },
    fastreply_add_getEmo(index) {
      var textArea = document.getElementById("textarea");

      this.changeSelectedText(textArea, this.faceList[index]);
      this.textarea = textArea.value; // To synchronize data in data
      return;
    },
    changeSelectedText(obj, str) {
      if (window.getSelection) {
        // Non-internet Explorer
        obj.setRangeText(str);
        // Resets the cursor position without selecting the text
        obj.selectionStart += str.length;
        obj.focus();
      } else if (document.selection) {
        // IE browser
        obj.focus();
        var sel = document.selection.createRange();
        sel.text = str;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.fastreply-add {
  width: 260px;
  height: 304px;
  position: relative;
  h2 {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(80, 80, 80, 1);
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    padding: 0 14px;
    box-sizing: border-box;
    i {
      font-size: 14px;
      font-style: normal;
      color: #217bde;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .text {
    height: 215px;
    color: #383838;
    background-color: rgba(246, 246, 249, 1);
    border-radius: 3px;
    font-size: 14px;
    text-align: left;
    position: relative;

    .el-textarea {
      height: 100%;
      /deep/ textarea {
        height: 100% !important;
        background-color: #fff;
        border: none;
        font: 400 14px Nunito, sans-serif;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 14px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      svg {
        margin-right: 10px;
      }
    }
  }
}
</style>