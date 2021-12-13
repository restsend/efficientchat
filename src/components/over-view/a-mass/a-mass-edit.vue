<template>
  <div class="a-mass-edit">
    <div class="content">
      <div class="left">
        <a-mass-edit-list
          :height="500"
          :isTag="true"
          v-if="curId === 0"
          @multipleSelection="multipleSelection"
        />
      </div>

      <div class="right">
        <h3>
          <img
            class="radio"
            src="@/images/radio.svg"
            alt=""
            onload="SVGInject(this)"
          />Block facebook， identify the broadcast as spam messages and
          configure sending rules is strongly recommended.
        </h3>

        <span class="title">Content</span>
        <div class="text">
          <el-input
            type="textarea"
            placeholder="Write your message here."
            v-model="textarea"
            resize="none"
          >
          </el-input>

          <div class="user" @click="userName">
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
            >Name
          </div>
        </div>

        <span class="title">Send rules：</span>
        <p>
          Number of messages per minute：<el-input
            v-model="sendCountPerMin"
            @input="sendCountPerMinInput"
          ></el-input>
        </p>

        <el-button type="success" @click="send">Send</el-button>
      </div>

      <div class="close" @click="close">
        <img src="@/images/close.svg" alt="" onload="SVGInject(this)" />
      </div>
    </div>
  </div>
</template>

<script>
import AMassEditCsv from "./a-mass-edit-csv.vue";
import aMassEditList from "./a-mass-edit-list.vue";
export default {
  components: { aMassEditList, AMassEditCsv },
  name: "a-mass-edit",
  props: { label: Object },
  data () {
    return {
      input: "",
      textarea: "",
      handleLastName: "",
      nav: [],
      curId: 0,
      contacts: [],
      sendCountPerMin: "50",
      message: "",
    };
  },
  methods: {
    handleInput ($event) {
      this.textarea = $event.target.innerText;
    },
    navActive (id) {
      this.curId = id;
    },
    close () {
      this.$emit("labelName", "WacrmLabelShow");
    },
    userName () {
      this.textarea += "[name]";
    },
    realTimeTextContent (text) {
      this.message = text;
    },
    handleLastNames () {
      this.handleLastName = "";
    },
    multipleSelection (val) {
      this.contacts = val;
    },
    sendCountPerMinInput () {
      if (this.sendCountPerMin <= 0) {
        this.sendCountPerMin = 1
      }
    },
    async send () {
      if (this.contacts.length !== 0) {
        if (this.textarea) {
          if (Number(this.sendCountPerMin) > 0) {
            let data = await this.$root.clip.batch.startJob(
              this.contacts,
              this.textarea,
              Number(this.sendCountPerMin)
            );
            this.$message({
              showClose: true,
              message: "successful",
              type: "success",
            });
            this.$emit("labelName", "WacrmLabelShow", true);
          } else {
            this.$message({
              showClose: true,
              message: "successful",
              type: "warning",
            });
          }
        } else {
          this.$message({
            showClose: true,
            message: "Content is required",
            type: "warning",
          });
        }
      } else {
        this.$message({
          showClose: true,
          message: "Contacts is required",
          type: "warning",
        });
      }
    },
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.a-mass-edit {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
  overflow-x: hidden;
  .content {
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate3d(-50%, 0, 0);
    background-color: #fff;
    display: flex;
    border-radius: 3px;
    .left {
      padding: 20px;
      .nav {
        display: flex;
        border-radius: 3px;
        overflow: hidden;
        margin-bottom: 17px;
        border: 1px solid #009688;
        color: #009688;
        span {
          display: block;
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
        }
        span.active {
          background-color: #009688;
          color: #fff;
        }
      }
    }
    .right {
      width: 477px;
      padding: 20px;
      h3 {
        margin-bottom: 20px;
        svg {
          width: 20px;
          height: 20px;
          margin-bottom: -5px;
          display: inline-block;
        }
        i {
          margin-right: 10px;
        }
      }
      .title {
        display: block;
        margin-bottom: 10px;
      }
      .text {
        margin-bottom: 20px;
        position: relative;
        height: 228px;
        background-color: #f6f6f9;
        .el-textarea {
          height: 100%;
          /deep/ textarea {
            height: 100%;
            background-color: #f6f6f9;
          }
        }
        .user {
          position: absolute;
          right: 8px;
          bottom: 7px;
          width: 118px;
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
      p {
        .el-input {
          width: 88px;
          height: 32px;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        height: 40px;
        margin-top: 160px;
        background-color: #009688;
      }
    }
    .close {
      position: absolute;
      top: -20px;
      right: -20px;
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>