<template>
  <div class="fastreply-add">
    <h2>
      Quick Reply
      <i @click.stop="cancel">Done</i>
    </h2>

    <ul>
      <li v-for="(item, index) in replyList" :key="index">
        <span
          @click.stop="edit(item, index)"
          style="display: block; width: calc(100% - 20px); height: 100%;word-wrap:break-word;"
          v-html="item"
          ></span
        >

        <el-popconfirm
          confirm-button-text="YES"
          cancel-button-text="NO"
          icon="el-icon-info"
          icon-color="red"
          title="Are you sure to delete the current quick reply?"
          @confirm="Delete(index)"
        >
          <i slot="reference" class="el-icon-delete"> </i>
        </el-popconfirm>
      </li>
    </ul>

    <div class="add" @click.stop="addFastreply">
      <i class="el-icon-plus"></i>
      Add New
    </div>
  </div>
</template>

<script>
export default {
  name: "fastreply-add",
  data() {
    return {
      replyList: [],
    };
  },
  async created() {
    this.replyList = await this.$root.clip.quickReply.getMessages();
  },
  methods: {
    cancel() {
      this.$emit("fastreplyName", "fastreplyShow");
    },
    addFastreply() {
      this.$emit("fastreplyName", "FastreplyAdd");
    },
    edit(text, index) {
      this.$emit("editFastreply", "FastreplyAdd", text, index);
    },
    async Delete(index) {
      await this.$root.clip.quickReply.delMessage(index);
      this.replyList = await this.$root.clip.quickReply.getMessages();
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
    }
  }
  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      width: 100%;
      padding: 5px 14px;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      box-sizing: border-box;
      .el-popconfirm {
        display: block;
        width: calc(100% - 20px);
        font-size: 14px;
        color: rgba(80, 80, 80, 1);
      }
      i {
        cursor: pointer;
      }
    }
  }
  .add {
    height: 46px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(42, 130, 228, 0.1);
    position: absolute;
    bottom: 0;
    cursor: pointer;
  }
}
</style>