<template>
  <div class="wacrm-label-show">
    <div class="addLabel">
      <span @click.stop="addLabel">Create Tag</span>
    </div>

    <div class="header">
      <span>Tag Groups(Tag)</span>
      <span>Actions</span>
    </div>

    <draggable
      class="draggable"
      v-model="labelSet"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <div class="grouping" v-for="item in labelSet" :key="item.id">
          <div class="title">
            <span>{{ item.name }}</span>
            <div class="del">
              <el-popconfirm
                confirm-button-text="YES"
                cancel-butaton-text="NO"
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to delete the current tag group?"
                @confirm="delGroup(item.id)"
              >
                <span class="icon el-icon-delete" slot="reference"></span>
              </el-popconfirm>

              <span @click.stop="edit(item)">
                <span class="icon el-icon-edit"></span>
              </span>
            </div>
          </div>

          <div class="label">
            <component-label
              v-for="(item1, index) in item.tags"
              :key="index"
              :text="item1.name"
              :color="item1.bgColor"
              :backgroundColor="item1.bgColor"
            />
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import componentLabel from "@/components/label/component-label.vue";
import draggable from "vuedraggable";
export default {
  components: { componentLabel, draggable },
  name: "wacrm-label-show",
  props: { labelShowData: Object },
  data() {
    return {
      labelSet: [],
      drag: false,
    };
  },
  async mounted() {
    this.labelSet = await this.$root.clip.tag.getGroups();
  },
  methods: {
    addLabel() {
      this.$emit("labelName", "WacrmLabelEdit");
    },
    edit(item) {
      this.$emit("edit", item);
    },
    //Deleting a Tag Group
    async delGroup(id) {
      await this.$root.clip.tag.delGroup(id);
      this.$message({
        showClose: true,
        message: "remove done",
        type: "success",
      });
      this.labelSet = await this.$root.clip.tag.getGroups();
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-label-show {
  height: calc(100% - 78px);
  .addLabel {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 11px;
    span {
      display: block;
      width: 88px;
      height: 32px;
      border-radius: 3px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      background-color: #0acf97;
      border-color: #0acf97;
      box-shadow: 0 2px 6px 0 rgb(10 207 151 / 50%);
    }
    span:hover {
      color: #fff;
      background-color: #09b080;
      border-color: #08a679;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: rgba(80, 80, 80, 1);
    background-color: rgba(245, 247, 250, 1);
    font-size: 14px;
    padding: 0 7px;
  }
  .grouping {
    margin-top: 12px;
    padding: 0 0 14px 7px;
    border-bottom: 1px solid #e5e5e5;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: rgba(80, 80, 80, 1);
      margin-bottom: 12px;
      .del {
        display: flex;
        align-items: center;
        span.icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 9px;
          cursor: pointer;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        span.icon {
          color: #fff;
          background-color: #6c757d;
        }
        span.icon:hover {
          background-color: #2c343f;
        }
      }
    }
    .label {
      display: flex;
      flex-wrap: wrap;
      span {
        margin-right: 10px;
        border: rgba(166, 166, 166, 1) solid 1px;
        background-color: rgba(244, 244, 245, 1);
        color: rgba(144, 147, 153, 1);
        font-size: 14px;
        padding: 2px 5px;
        border-radius: 2px;
      }
    }
  }
  .draggable {
    height: calc(100% - 93px);
    overflow-x: hidden;
  }
  .draggable::-webkit-scrollbar {
    width: 5px !important;
  }
}
</style>