<template>
  <div
    :class="{ active: isActive }"
    @click="selectedLabel(backgroundColor, text)"
    ref="componentLabel"
    class="component-label"
    :style="{ padding: isClose ? '6px 16px 6px 6px' : '6px' }"
  >
    {{ text }}

    <svg
      v-if="isClose"
      @click="close"
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 48 48"
      fill="#fff"
    >
      <path d="M0 0h48v48H0z" fill="none"></path>
      <path
        d="M29.17 16L24 21.17 18.83 16 16 18.83 21.17 24 16 29.17 18.83 32 24 26.83 29.17 32 32 29.17 26.83 24 32 18.83 29.17 16zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"
      ></path>
    </svg>

  </div>
</template>

<script>
export default {
  name: "wacrm-label",
  props: {
    text: {
      type: String,
      required: false,
      default: "Labels",
    },
    width: {
      type: Number,
      required: false,
      default: null,
    },
    height: {
      type: Number,
      required: false,
      default: null,
    },
    backgroundColor: {
      type: String,
      required: false,
      default: "rgba(10, 207, 151)",
    },
    color: {
      type: String,
      required: false,
      default: "#fff",
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    isClose: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {
    backgroundColor(val) {
      this.$refs.componentLabel.style.setProperty(
        "--labelBackgroundColor",
        val
      );
      this.$refs.componentLabel.style.setProperty("--labelColor", val);
    },
  },
  mounted() {
    this.$refs.componentLabel.style.setProperty(
      "--labelBackgroundColor",
      this.backgroundColor
    );
    this.$refs.componentLabel.style.setProperty("--labelColor", this.color);
  },
  methods: {
    selectedLabel(backgroundColor, text) {
      this.$emit("tag", {
        text: text,
        backgroundColor: backgroundColor,
      });
    },
    close() {
      this.$emit("close", "");
    },
  },
};
</script>

<style lang="less" scoped>
.component-label {
  color: var(--labelColor);
  font-size: 14px;
  border-radius: 4px;
  font-weight: 700;
  margin-right: 5px;
  margin-bottom: 5px;
  transform: scale(1);
  cursor: pointer;
  border: 1px solid;
  border-color: var(--labelBackgroundColor);
  -moz-user-select: none; /*firefox*/
  -webkit-user-select: none; /*webkit*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
  position: relative;
  svg {
    position: absolute;
    top: 0px;
    right: 0px;
    opacity: 0;
    transition: all 0.3s;
  }
}
.component-label:hover {
  svg {
    opacity: 1;
  }
}
.component-label.active {
  color: #fff;
  background-color: var(--labelBackgroundColor);
}
.component-label:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
}
.component-label:after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.3);
}
</style>