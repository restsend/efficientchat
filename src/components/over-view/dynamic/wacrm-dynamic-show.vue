<template>
  <div class="wacrm-dynamic-show">
    <div class="addLabel">
      <span @click="addDynamic">new</span>
    </div>

    <div class="header">
      <span>Polling content</span>
      <span>operation</span>
    </div>

    <div class="grouping" v-for="(item, index) in dynamic" :key="index">
      <div class="title">
        <span>{{ item }}</span>
        <div>
          <el-popconfirm
            confirm-button-text="confirm"
            cancel-button-text="cancel"
            icon="el-icon-info"
            icon-color="red"
            title="Are you sure you want to delete it?"
          >
            <span slot="reference"
              ><svg
                t="1627033276754"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="8686"
                width="20"
                height="20"
              >
                <path
                  d="M512.145 261.27c-33.552 0-60.709 22.846-62.947 52.175h125.579c-1.907-29.343-29.079-52.175-62.632-52.175zM337.567 700.605c0 32.936 21.497 56.006 41.028 56.006v0.295h280.747c19.532 0 41.015-23.057 41.015-56.006V378.657h-362.79v321.948z m237.211-214.917c0-15.998 12.564-28.769 27.907-28.769s27.908 12.771 27.908 28.769v164.188c0 15.998-12.565 28.769-27.908 28.769-15.703 0-27.907-12.771-27.907-28.769V485.688z m-83.725 0c0-15.998 12.565-28.769 27.908-28.769 15.357 0 27.923 12.771 27.923 28.769v164.188c0 15.996-12.562 28.765-27.915 28.769-15.355-0.004-27.916-12.774-27.916-28.769V485.688z m-97.67 0c0-15.998 12.565-28.769 27.908-28.769 15.358 0 27.908 12.771 27.908 28.769v164.188c0 15.995-12.546 28.764-27.9 28.769-15.715-0.005-27.916-12.774-27.916-28.769V485.688zM512 0C229.231 0 0 229.23 0 512s229.23 512 512 512 512-229.23 512-512S794.77 0 512 0z m269.152 376.509h-30.835V698.99c0 60.904-44.016 110.104-98.286 110.104H375.157c-54.27 0-98.286-49.493-98.286-110.104V376.187h-34.048c-17.018 0-30.819-12.888-30.835-28.795 0.017-15.908 13.817-28.796 30.835-28.796H395.71c2.252-60.904 55.575-109.5 121.089-109.5 65.436-0.03 118.993 48.664 120.774 109.809h143.578c17.019 0 30.82 12.888 30.836 28.796-0.007 15.912-13.811 28.808-30.835 28.808z"
                  fill="#d81e06"
                  p-id="8687"
                ></path></svg
            ></span>
          </el-popconfirm>
          <span>The editor</span>
        </div>
      </div>

      <div class="label" v-if="false">
        <p>
          This is a text
        </p>
      </div>
    </div>

    <h3>Time interval between</h3>
    <div class="intervalBetween">
      <el-select v-model="intervalBetween" placeholder="The label">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "wacrm-dynamic-show",
  data() {
    return {
      intervalBetween: "",
      options: [],
      dynamic: [],
    };
  },
  methods: {
    addDynamic() {
      this.$emit("dynamicName", "WacrmDynamicEdit");
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-dynamic-show {
  .addLabel {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 11px;
    span {
      display: block;
      width: 88px;
      height: 32px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(15, 95, 184, 1);
      border-radius: 3px;
      font-size: 14px;
      line-height: 32px;
      text-align: center;
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
    padding: 0 0 0 7px;
    border-bottom: 1px solid #e5e5e5;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: rgba(80, 80, 80, 1);
      margin-bottom: 12px;
      div {
        span {
          color: #2a82e4;
          margin-left: 9px;
          cursor: pointer;
        }
        span:first-of-type {
          color: #d43030;
        }
      }
    }
    .label {
      p {
        color: rgba(144, 147, 153, 1);
        background-color: rgba(244, 244, 245, 0);
        font-size: 14px;
        text-align: left;
      }
    }
  }
  h3 {
    color: rgba(128, 128, 128, 1);
    font-size: 14px;
    font-weight: normal;
  }
  .intervalBetween {
    width: 100%;
    .el-select {
      width: 100%;
    }
  }
}
</style>