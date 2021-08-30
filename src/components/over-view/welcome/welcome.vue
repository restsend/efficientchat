<template>
  <div class="welcome">
    <h3>
      Welcome Messages
      <el-switch v-model="value" :inactive-text="value ? 'ON' : 'OFF'">
      </el-switch>
    </h3>
    <p>
      When a customer adds you,  the system will automatically reply to the welcome message.
    </p>

    <welcome-show
      v-if="welcomeName === 'WelcomeShow'"
      @welcomeName="welcomeNames"
      :style="{ opacity: value ? '1' : '0.5' }"
      :welcomeText="welcomeText"
    />

    <welcome-edit
      v-if="welcomeName === 'WelcomeEdit'"
      @cancel="cancel"
      @confirm="confirm"
      :style="{ opacity: value ? '1' : '0.5' }"
      :welcomeText="welcomeText"
    />

    <div v-if="!value" class="bg"></div>
  </div>
</template>

<script>
import WelcomeEdit from "./welcome-edit.vue";
import WelcomeShow from "./welcome-show.vue";
export default {
  components: { WelcomeEdit, WelcomeShow },
  name: "welcome",
  props: {},
  data() {
    return {
      welcomeName: "WelcomeShow",
      value: false,
      welcomeText: "",
    };
  },
  watch: {
    async value(val) {
      await this.$root.clip.welcome.setEnabled(val);
    },
  },
  async mounted() {
    this.value = await this.$root.clip.welcome.getEnabled();
  },
  methods: {
    welcomeNames(name, text) {
      this.welcomeText = text;
      this.welcomeName = name;
    },
    cancel(val) {
      this.welcomeName = "WelcomeShow";
    },
    async confirm(val) {
      this.welcomeName = "WelcomeShow";
      await this.$root.clip.welcome.setMessage(val);
      this.welcomeText = val;
    },
  },
};
</script>

<style lang="less" scoped>
.welcome {
  width: 100%;
  height: 100%;
  padding: 25px 10px 12px;
  position: relative;
  h3 {
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
    margin-bottom: 21px;
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