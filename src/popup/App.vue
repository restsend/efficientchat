<template>
  <div class="extension">
    <button v-on:click="buttonStart">Start</button>
  </div>
</template>

<script>
const browser = require("webextension-polyfill");
export default {
  data() {
    return {};
  },
  methods: {
    buttonStart() {
      chrome.tabs.executeScript(null, { file: "app/content.js" });
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 16px;
}
.extension {
  width: 300px;
  text-align: center;
}
</style>