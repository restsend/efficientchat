<template>
  <div class="a-mass-edit-csv">
    <el-input
      v-if="curId===0"
      type="textarea"
      placeholder="Please enter the content"
      v-model="textarea"
      resize="none"
    >
    </el-input>

    <a-mass-edit-list :height="379" v-if="curId===1" :isTag="false" />

    <div class="nav">
      <span
        :class="{ active: curId === item.id }"
        v-for="(item, index) in nav"
        :key="index"
        @click="navActive(item.id)"
        >{{ item.name }}</span
      >
    </div>

    <p>Uploaded message will not be used for default WhatsApp</p>
    <a href="#">Download template</a>
  </div>
</template>

<script>
import aMassEditList from "./a-mass-edit-list.vue";
export default {
  components: { aMassEditList },
  name: "a-mass-edit-csv",
  data() {
    return {
      textarea: "",
      nav: [
        {
          id: 0,
          name: "Input",
        },
        {
          id: 1,
          name: "Check",
        },
      ],
      curId: 0,
    };
  },
  methods: {
    navActive(id){
      this.curId=id
    }
  },
};
</script>

<style lang="less" scoped>
.a-mass-edit-csv {
  height: 547px;
  .el-textarea {
    width: 328px;
    height: 426px;
    display: block;
    /deep/ textarea {
      height: 100%;
    }
  }
  .nav {
    margin-bottom: 10px;
    border: 1px solid #009688;
    display: inline-block;
    border-radius: 3px;
    overflow: hidden;
    margin-top: 5px;
    span {
      display: inline-block;
      width: 100px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      color: #009688;
      cursor: pointer;
    }
    span.active {
      color: #fff;
      background-color: #009688;
    }
  }
  p {
    width: 328px;
    margin-bottom: 10px;
  }
}
</style>