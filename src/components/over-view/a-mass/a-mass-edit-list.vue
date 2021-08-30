<template>
  <div class="a-mass-edit-list">
    <div class="search">
    </div>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :height="height"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="35"> </el-table-column>
      <el-table-column label="Select All" width="170">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
          <p>Phone:+{{ scope.row.phone }}</p>
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template slot="header">
          <i class="el-icon-s-custom"></i
          >{{ multipleSelection.length }} Broadcasts
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "a-mass-edit-list",
  props: {
    height: Number,
    isTag: Boolean,
  },
  data() {
    return {
      labelSet: [],
      value: "",
      input: "",
      tableData: [],
      multipleSelection: [],
    };
  },
  created() {
    this.tableData = this.$root.clip.batch.contacts;
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("multipleSelection", this.multipleSelection);
    },
    async visible(event) {
      if (event) {
        this.labelSet = await this.$root.clip.tag.getGroups();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.a-mass-edit-list {
  width: 328px;
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    .el-input {
      width: 150px;
      height: 32px;
    }
    .el-select {
      width: 150px;
      height: 32px;
    }
  }
  .el-table {
    /deep/ .cell {
      padding: 0 10px;
    }
  }
}
</style>