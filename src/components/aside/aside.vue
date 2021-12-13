<template>
  <div class="wacrm-aside">
    <div class="top">
      <ul>
        <li
          v-for="(item, index) in aside"
          :key="index"
          @click.stop="asideName(item.label)"
          :class="{ active: asideActive === item.label }"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.tooltip"
            placement="top"
          >
            <span
              style="
                display: flex;
                width: 100%;
                height: 100%;
                align-items: center;
                justify-content: center;
              "
            >
              <img :src="item.icon" alt="" onload="SVGInject(this)" />
            </span>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>
    

<script>
export default {
  name: "wacrm-aside",
  props: { asideNameIndex: String },
  data () {
    return {
      aside: [
        {
          name: "Tags",
          icon: require("@/images/tags.svg"),
          label: "WacrmLabel",
          tooltip:"Customer Tags"
        },
        {
          name: "Welcome",
          icon: require("@/images/welcome.svg"),
          label: "Welcome",
          tooltip:"Welcome Messages"
        },
        {
          name: "AutoReplay",
          icon: require("@/images/reply.svg"),
          label: "WacrmReply",
          tooltip:"Keyword Reply"
        },
        {
          name: "radio",
          icon: require("@/images/radio.svg"),
          label: "AMass",
          tooltip:"Broadcast"
        },
      ],
      asideActive: "index",
    };
  },
  watch: {
    asideNameIndex (val) {
      this.asideActive = val;
      this.$emit("asideName", this.asideActive);
    },
  },
  methods: {
    asideName (name) {
      if (this.asideActive === name) {
        this.asideActive = "index";
      } else {
        this.asideActive = name;
      }
      this.$emit("asideName", this.asideActive);
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-aside {
  width: 100%;
  // background-color: #fafbfe;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .top {
    width: 100%;
    ul {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
      li {
        width: 70px;
        height: 32px;
        display: flex;
        line-height: 32px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--icon);
        color: var(--icon);
        font-size: 14px;
        cursor: pointer;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out;

        img {
          width: 24px;
          height: 24px;
        }
        img g {
          fill: var(--icon);
        }
      }
      li:last-of-type {
        border-radius: 0 3px 3px 0;
      }

      li:first-of-type {
        border-radius: 3px 0 0 3px;
      }

      li:not(:last-of-type) {
        border-right: none;
      }
      li.active {
        background-color: #09b080;
        color: #ffffff;
      }
    }
  }
  .bottom {
    width: 100%;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      font-size: 14px;
    }
  }
}
</style>