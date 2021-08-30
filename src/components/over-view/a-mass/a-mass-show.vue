<template>
  <div class="a-mass-show">
    <div class="addLabel">
      <span @click.stop="addLabel">New Broadcast</span>
    </div>

    <div class="header">
      <span>{{ labelSet.length }} Broadcasts</span>
      <div>
        <span>Status</span>
        <span>Action</span>
      </div>
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
            <span>
              <span>
                sent: <i> {{ item.totalSent }} </i> /
                {{ item.totalCount }}</span
              >
              <el-progress
                :percentage="parseInt((item.totalSent / item.totalCount) * 100)"
                :color="customColor"
              ></el-progress>
            </span>
            <div class="del">
              <span class="status">
                <i
                  class="el-icon-video-play"
                  style="color: #43cf7c; font-size: 20px"
                  v-if="item.state === 'running'"
                  @click="stopJob(item.id)"
                ></i>
                <i
                  class="el-icon-video-pause"
                  style="color: #ff8d1a; font-size: 20px"
                  v-if="
                    item.state === 'stop' &&
                    parseInt((item.totalSent / item.totalCount) * 100) !== 100
                  "
                  @click="resumeJob(item.id)"
                ></i>
                <i
                  class="el-icon-success"
                  style="color: #43cf7c; font-size: 20px"
                  v-if="
                    parseInt((item.totalSent / item.totalCount) * 100) === 100
                  "
                ></i>
              </span>

              <el-popconfirm
                confirm-button-text="YES"
                cancel-butaton-text="NO"
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure you want to delete?"
                @confirm="delGroup(item.id)"
              >
                <span class="icon el-icon-delete" slot="reference"></span>
              </el-popconfirm>
            </div>
          </div>

          <div class="content">
            <p>
              start at: <span>{{ item.startAt.toLocaleString() }}</span>
            </p>
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
  name: "a-mass-show",
  props: { labelShowData: Object },
  data() {
    return {
      labelSet: [],
      drag: false,
      percentage: 0,
      customColor: "#409eff",
      time: null,
    };
  },
  mounted() {
    this.getJobs();
  },
  methods: {
    getJobs() {
      this.time = setInterval(async () => {
        this.labelSet = await this.$root.clip.batch.getJobs();
        var flag = true;
        this.labelSet.forEach((element) => {
          if (element.state === "running") {
            flag = false;
          }
        });

        if (flag) {
          clearInterval(this.time);
        }
      }, 1000);
    },
    addLabel() {
      this.$emit("labelName", "WacrmLabelEdit");
    },
    //Deleting a Tag Group
    async delGroup(id) {
      await this.$root.clip.batch.removeJob(id);
      this.$message({
        showClose: true,
        message: "remove done",
        type: "success",
      });
      this.labelSet = await this.$root.clip.batch.getJobs();
    },
    async stopJob(id) {
      await this.$root.clip.batch.stopJob(id);
    },
    async resumeJob(id) {
      await this.$root.clip.batch.resumeJob(id);
      this.getJobs();
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
.a-mass-show {
  height: calc(100% - 78px);
  .addLabel {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 11px;
    span {
      display: block;
      height: 32px;
      border-radius: 3px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
      color: #fff;
      padding: 0 5px;
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
    div {
      display: flex;
      align-items: center;
      span:first-of-type {
        margin-right: 20px;
      }
    }
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
      span {
        display: flex;
        align-items: center;
        span {
          i {
            color: #43cf7c;
          }
        }
        .el-progress {
          width: 110px;
          margin-left: 15px;
        }
      }
      .del {
        width: 105px;
        display: flex;
        align-items: center;
        span {
          width: calc((100% - 20px) / 2);
        }
        .status {
          margin-right: 20px;
        }
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
    .content {
      p {
        margin-bottom: 10px;
        span {
          color: #a6a6a6;
          font-size: 12px;
        }
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