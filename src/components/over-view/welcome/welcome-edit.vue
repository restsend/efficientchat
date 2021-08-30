<template>
  <div class="welcome-edit">
    <div class="text">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="textarea"
        resize="none"
        id="textarea"
      >
      </el-input>

      <div class="user" @click.stop="nickname" v-if="false">
        <svg
          t="1625735740760"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2418"
          width="16"
          height="16"
        >
          <path
            d="M511.997 597.333c125.778 0 241.87-109.881 254.883-270.586C780.487 158.596 668.816 0 511.997 0 355.184 0 243.506 158.596 257.124 326.747 270.131 487.452 386.225 597.333 511.997 597.333zM509.719 684.073C228.208 684.073 0 796.019 0 934.112c0 47.221 43.411 65.423 171.081 79.221C269.777 1024 387.61 1024 512 1024c127.414 0 253.777 0 342.675-10.667 125.756-15.09 169.325-32 169.325-79.221C1024 796.019 791.22 684.073 509.719 684.073z"
            p-id="2419"
            fill="#999999"
          ></path></svg
        >插入客户昵称
      </div>
    </div>

    <div class="btn">
      <div class="left">

        <el-tooltip
          v-if="false"
          class="item"
          effect="dark"
          content=""
          placement="bottom"
        >
          <svg
            t="1625736077810"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7979"
            width="20"
            height="20"
          >
            <path
              d="M384 256a42.666667 42.666667 0 1 1 0 85.333333H256a170.666667 170.666667 0 0 0-8.533333 341.12L256 682.666667h128a42.666667 42.666667 0 0 1 0 85.333333H256A256 256 0 1 1 256 256h128z m384 0a256 256 0 1 1 0 512h-128a42.666667 42.666667 0 0 1 0-85.333333h128a170.666667 170.666667 0 1 0 0-341.333334h-128a42.666667 42.666667 0 0 1 0-85.333333h128z m-85.333333 213.333333a42.666667 42.666667 0 0 1 0 85.333334H341.333333a42.666667 42.666667 0 0 1 0-85.333334h341.333334z"
              fill="#999999"
              p-id="7980"
            ></path>
          </svg>
        </el-tooltip>
      </div>
      <div class="right">
        <el-button size="mini" @click.stop="cancel">Cancel</el-button>
        <el-button type="primary" size="mini" @click.stop="confirm"
          >Save</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome-edit",
  props: {
    isLink: {
      type: Boolean,
      required: false,
      default: true,
    },
    isUser: {
      type: Boolean,
      required: false,
      default: true,
    },
    reply: Object,
    welcomeText: String,
  },
  data() {
    return {
      text: "",
      faceList: [],
      textarea: "",
    };
  },
  mounted() {
    for (let i in appData) {
      this.faceList.push(appData[i].char);
    }

      if(this.welcomeText){
        this.textarea = this.welcomeText.replace(/<(?!\/?br\/?.+?>)[^<>]*>/g,"");
      }
  },
  methods: {
    cancel() {
      this.$emit("cancel", "");
    },
    confirm() {
      if (this.textarea) {
        this.textarea="<pre>"+this.textarea+"</pre>"
        var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        this.$emit(
          "confirm",
          this.textarea.replace(reg, "<a target='_blank' href='$1$2'>$1$2</a>")
        );
      } else {
        this.$emit("confirm", "");
      }
    },
    welcome_edit_getEmo(index) {
      var textArea = document.getElementById("textarea");

      this.changeSelectedText(textArea, this.faceList[index]);
      this.textarea = textArea.value;
      return;
    },
    changeSelectedText(obj, str) {
      if (window.getSelection) {
        obj.setRangeText(str);

        obj.selectionStart += str.length;
        obj.focus();
      } else if (document.selection) {
        obj.focus();
        var sel = document.selection.createRange();
        sel.text = str;
      }
    },
    nickname() {
      var textArea = document.getElementById("textarea");
      textArea.focus();
      this.textarea += "{{UserName}}";
    },
  },
};
</script>

<style lang="less">
.welcome-edit .el-popover {
  height: 200px;
  width: 300px;
  overflow: scroll;
  overflow-x: auto;
}
</style>

<style lang="less" scoped>
.welcome-edit {
  .text {
    height: 200px;
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
        background-color: #f6f6f9;
        border: none;
      }
    }
    .user {
      position: absolute;
      right: 8px;
      bottom: 7px;
      width: 148px;
      height: 30px;
      background-color: rgba(229, 229, 229, 1);
      color: #505050;
      border-radius: 16px;
      font-size: 14px;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        margin-right: 10px;
      }
    }
  }
  .btn {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .left {
      display: flex;
      align-items: center;
    }
  }
}
</style>