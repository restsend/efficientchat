<template>
  <div class="function-page">
    <wacrm-main
      @asideNameIndex="asideNameIndex"
      :asideName="asideName"
      :bottomBar="bottomBar"
      :pag="pag"
      :userContact="userContact"
      :groupContact="groupContact"
    />
  </div>
</template>

<script>
import WacrmMain from "@/components/over-view/main.vue";
export default {
  components: { WacrmMain },
  name: "function-page",
  props: { asideName: String, bottomBar: Object,userContact:Object,groupContact:Object,pag:String },
  methods: {
    asideNameIndex(val) {
      this.$emit("asideNameIndex", val);
    },
  },
};
</script>

<style lang="less" scoped>
.function-page {
  width: 100%;
  height: 100%;
}
</style>