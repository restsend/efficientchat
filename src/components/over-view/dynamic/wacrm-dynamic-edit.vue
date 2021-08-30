<template>
  <div class="wacrm-dynamic-edit">
    <div class="reply">
      <welcome-edit :isLink="false" :isUser="false" @cancel="cancel" @confirm="confirm" />
    </div>

  </div>
</template>

<script>
import welcomeEdit from '../welcome/welcome-edit.vue';
export default {
  components: { welcomeEdit },
  name: "wacrm-dynamic-edit",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("dynamicName", "wacrmDynamicShow");
    },
    confirm() {
      this.$emit("dynamicName", "wacrmDynamicShow");
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-dynamic-edit {
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
        .el-color-picker{
            margin-left: 5px;
        }
      }
    }
  }
  .btn{
      display: flex;
      justify-content: flex-end;
  }
}
</style>