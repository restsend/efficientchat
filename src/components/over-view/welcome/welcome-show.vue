<template>
  <div class="welcome-show" @click.stop="edit">
    <p v-html="value"></p>
  </div>
</template>

<script>
export default {
  name: "welcome-show",
  props: { },
  data() {
    return {
      value: "",
    };
  },
  watch: {},
  async created() {
    this.value = await this.$root.clip.welcome.getMessage();
  },
  methods: {
    edit() {
      this.$emit("welcomeName", "WelcomeEdit", this.value);
    },
  },
};
</script>

<style lang="less" scoped>
.welcome-show {
  height: 200px;
  color: #383838;
  background-color: rgba(246, 246, 249, 1);
  border-radius: 3px;
  font-size: 14px;
  padding: 8px;
  text-align: left;
  p {
    margin: 0 0 1px 0;
    font-size: 14px;
  }
  a {
    color: #2a82e4;
  }
}
</style>