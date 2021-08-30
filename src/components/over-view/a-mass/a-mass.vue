<template>
  <div class="a-mass">
    <h3>Broadcast</h3>
    <p>
      Sent once to all targeted contacts, eg. a product newsletter.
    </p>

    <wacrm-label-show
      @edit="edit"
      v-if="labelName === 'WacrmLabelShow' || labelName === 'WacrmLabelEdit'"
      @labelName="labelNames"
    />

    <wacrm-label-edit
      v-if="labelName === 'WacrmLabelEdit'"
      :label="label"
      @labelName="labelNames"
    />
  </div>
</template>

<script>
import WacrmLabelEdit from "./a-mass-edit.vue";
import WacrmLabelShow from "./a-mass-show.vue";
export default {
  components: { WacrmLabelShow, WacrmLabelEdit },
  name: "a-mass",
  props: {},
  data() {
    return {
      labelName: "WacrmLabelShow",
      label: {},
    };
  },
  methods: {
    labelNames(name,flag) {
      this.labelName = name;
      this.label = {};
      if(flag){
      this.labelName = "";
      this.$nextTick(() => {
        this.labelName = name;
      });
      }
    },
    edit(item) {
      this.label = item;
      this.labelName = "WacrmLabelEdit";
    },
  },
};
</script>

<style lang="less" scoped>
.a-mass {
  width: 100%;
  height: 100%;
  padding: 25px 10px 0;
  h3 {
    font-size: 16px;
    font-weight: normal;
    color: rgba(80, 80, 80, 1);
    margin-bottom: 15px;
    margin-top: 0;
  }
  p {
    font-size: 14px;
    font-weight: normal;
    color: #909399;
    margin-bottom: 13px;
    margin-top: 0;
    word-spacing:2px
  }
}
</style>