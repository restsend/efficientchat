<template>
  <div id="fastreply-show" class="fastreply-show">
    <h2>
      Quick Reply
      <i class="el-icon-edit" @click.stop="edit"></i>
    </h2>

    <draggable
      element="ul"
      v-model="replyList"
      handle=".handle"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <transition-group type="transition" :name="!drag ? 'flip-list' : null">
        <li v-for="item in replyList" :key="item.id">
          <span @click="send(item)" v-html="item"></span
          ><i v-if="false" class="handle el-icon-sort"></i>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "fastreply-show",
  components: {
    draggable,
  },
  data() {
    return {
      replyList: [],
      drag: false,
    };
  },
  async created() {
    var msgs = await this.$root.clip.quickReply.getMessages();
    var idx = 0;
    msgs.forEach((m) => {
      m.id = idx++;
    });
    this.replyList = msgs;
  },
  methods: {
    edit() {
      this.$emit("fastreplyName", "FastreplyEdit");
    },
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    },
    async send(item) {
      var text = item.replace(/<(?!\/?br\/?.+?>)[^<>]*>/g, "");
      await this.$root.clip.sendQuickReply(text);
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
.fastreply-show {
  width: 260px;
  height: 304px;
  h2 {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(80, 80, 80, 1);
    font-size: 16px;
    font-weight: normal;
    margin: 0;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    padding: 0 14px;
    box-sizing: border-box;
    i {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  ul {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    height: calc(100% - 48px);
    overflow-x: hidden;
    li {
      width: 100%;
      padding: 10px 14px;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      box-sizing: border-box;
      span {
        display: block;
        width: calc(100% - 20px);
        font-size: 14px;
        color: rgba(80, 80, 80, 1);
        word-wrap: break-word;
      }
    }
  }
  .add {
    height: 46px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(42, 130, 228, 0.1);
    position: absolute;
    bottom: 0;
  }
}
</style>