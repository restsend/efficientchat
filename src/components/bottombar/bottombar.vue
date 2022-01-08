<template>
  <div class="bottomBar">
    <div class="left">
      <wacrm-aside :asideNameIndex="asideNameIndex" @asideName="asideName" />
    </div>

    <el-menu
      class="el-menu-demo el-menu-vertical-demo"
      mode="horizontal"
      menu-trigger="click"
    >
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-help"></i></template>
        <el-menu-item index="2-1">
          <a
            href="https://api.whatsapp.com/send?phone=+8618158525856&text=I'm%20an%20EfficientChat%20customer%20with%20a%20question."
            style="color: #909399"
            target="_blank"
            >✨ Contact us 🔥</a
          >
        </el-menu-item>
        <el-menu-item index="2-2"
          ><a :href="aboutLink" style="color: #909399" target="_blank"
            >❤️ About EfficientChat 😃</a
          ></el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import WacrmAside from "../aside/aside.vue";
import fastreplyBox from "../fastreply/fastreply-box.vue";
export default {
  components: { fastreplyBox, WacrmAside },
  name: "bottomBar",
  props: { asideNameIndex: String },
  data() {
    return {
      aboutLink: `https://restsend.com/?_v=wacrm_${process.env.WACRM_VERSION}&_i=${window.waAPI.meId}`,
    };
  },
  methods: {
    synchronous() {
      this.$emit("synchronous", "");
    },
    asideName(asideName) {
      this.$emit("asideName", asideName);
    },
  },
};
</script>

<style lang="less" scoped>
.bottomBar {
  width: 100%;
  height: 62px;
  position: absolute;
  background-color: var(--rich-text-panel-background);
  border-left: 1px solid var(--border-stronger);
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
  position: relative;
  padding-left: 10px;
  .left {
    width: calc(100% - 78px);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .logo {
      width: 32px;
      height: 32px;
      color: rgba(80, 80, 80, 1);
      background-color: rgba(153, 153, 153, 1);
      border-radius: 50%;
      margin-right: 14px;
    }
    span {
      color: rgba(80, 80, 80, 1);
      font-size: 14px;
    }
  }
  .el-menu {
    position: absolute;
    right: 0;
    background-color: var(--rich-text-panel-background);
    /deep/ .el-submenu__title > .el-submenu__icon-arrow {
      display: none;
    }
    /deep/ .el-submenu__title,
    .el-menu-item {
      padding: 0 5px;
      i {
        margin: 0;
      }
    }
    /deep/ .el-submenu__title:hover,
    .el-menu-item:hover {
      background-color: rgba(var(--shadow-rgb), 0.1);
    }
    /deep/ .is-active {
      background-color: rgba(var(--shadow-rgb), 0.1);
      border-bottom: none;
    }
    /deep/ .is-active:focus {
      background-color: rgba(var(--shadow-rgb), 0.1);
      color: #909399;
    }
  }
  .el-menu:hover {
    background-color: rgba(var(--shadow-rgb), 0.1);
  }
}
</style>
