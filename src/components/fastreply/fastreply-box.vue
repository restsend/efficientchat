<template>
  <div class="fastreply-box" ref="fastreplyBox" @click.self="isFastreplys">
    <i
      style="font-size: 28px; color: var(--icon)"
      @click="isFastreplys"
      class="el-icon-chat-line-square"
    ></i>
    <fastreply v-if="isFastreply" />
  </div>
</template>

<script>
import fastreply from "./fastreply.vue";
export default {
  name: "fastreply-box",
  components: { fastreply },
  data() {
    return {
      isFastreply: false,
    };
  },
  mounted() {
    document.addEventListener("click", (e) => {
      if (this.$refs.fastreplyBox) {
        let isSelf = this.$refs.fastreplyBox.contains(e.target);
        if (!isSelf) {
          this.isFastreply = false;
        }
      }
    });
  },
  methods: {
    isFastreplys() {
      this.isFastreply = !this.isFastreply;
    },
  },
};
</script>


<style lang="less" scoped>
.fastreply-box {
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  svg {
    margin-right: 7px;
  }
  span {
    font-size: 14px;
  }
}
.fastreply-box:hover .fastreply {
  display: block;
}
</style>