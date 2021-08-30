<template>
  <div class="wacrm-label">
    <h3>Customer Tags</h3>
    <p>
      With customer tags created, you can quickly understand and accurately
      screen customers by tagging them.
    </p>

    <wacrm-label-show
      @edit="edit"
      v-if="labelName === 'WacrmLabelShow'"
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
import WacrmLabelEdit from "./wacrm-label-edit.vue";
import WacrmLabelShow from "./wacrm-label-show.vue";
export default {
  components: { WacrmLabelShow, WacrmLabelEdit },
  name: "wacrm-label",
  props: {},
  data() {
    return {
      labelName: "WacrmLabelShow",
      label: {},
    };
  },
  methods: {
    labelNames(name) {
      this.labelName = name;
      this.label = {};
    },
    edit(item) {
      this.label = item;
      this.labelName = "WacrmLabelEdit";
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-label {
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