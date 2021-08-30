<template>
  <div class="wacrm-dynamic">
    <h3>
      Dynamic shuffling
      <el-switch v-model="isWacrmDynamic" inactive-text="关闭"> </el-switch>
    </h3>
    <p>
      After dynamic rotation is enabled, customers will receive multiple notices
      of discounts and discounts set by you and display them in a cycle.
    </p>

    <wacrm-dynamic-show
      v-if="dynamicName === 'wacrmDynamicShow'"
      @dynamicName="dynamicNames"
    />

    <wacrm-dynamic-edit
      v-if="dynamicName === 'WacrmDynamicEdit'"
      @dynamicName="dynamicNames"
    />
  </div>
</template>

<script>
import WacrmDynamicEdit from "./wacrm-dynamic-edit.vue";
import wacrmDynamicShow from "./wacrm-dynamic-show.vue";
export default {
  components: { wacrmDynamicShow, WacrmDynamicEdit },
  name: "wacrm-dynamic",
  data () {
    return {
      isWacrmDynamic: true,
      dynamicName: 'wacrmDynamicShow'
    }
  },
  methods: {
    dynamicNames (name) {
      this.dynamicName = name;
    },
  }
};
</script>

<style lang="less" scoped>
.wacrm-dynamic {
  width: 100%;
  height: 100%;
  padding: 12px 10px;
  h3 {
    width: 100%;
    font-size: 16px;
    font-weight: normal;
    color: rgba(80, 80, 80, 1);
    margin-bottom: 6px;
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-switch {
      margin-right: 20px;
    }
  }
  p {
    font-size: 14px;
    font-weight: normal;
    color: #909399;
    margin-bottom: 13px;
    margin-top: 0;
  }
}
</style>