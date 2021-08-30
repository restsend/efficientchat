<template>
  <div class="wacrm-main">
    <div class="nullPag" v-if="pag === ''">
      <div class="logo">
          <div class="img">
            <img src="@/images/logo.png" alt="" />EfficientChat
          </div>
          
        <a :href="aboutLink" target="_blank">by restsend.com</a>
      </div>

      <div class="content">
        <span class="title">Grow your Business on WhatsApp</span>
        <p>Deliver quick response customer service with EfficientChat.</p>

        <span class="title title-botttom">Quick Start</span>
        <div class="guide">
          <p>
            <i>👈</i>
            <span>Open the chat window to improve customer information</span>
          </p>
          <p>
            <i>👇</i>
            <span>With auto reply, you can work like a robot.</span>
          </p>
          <p>
            <i>👇</i>
            <span
              >The customer is multi-faceted, the tag grouping makes the
              customer more accurate.</span
            >
          </p>

          <div class="bgimg">
            <img src="@/images/null.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <Profile :userContact="userContact" v-if="pag === 'Profile'" />

    <group-chat :groupContact="groupContact" v-if="pag === 'Group'" />

    <div
      ref="popUp"
      class="pop-up"
      :style="{ bottom: isPopUp ? '0' : 'calc(-100% + 59px)' }"
    >
      <wacrm-label v-if="aside === 'WacrmLabel'" />
      <welcome v-if="aside === 'Welcome'" />
      <wacrm-reply v-if="aside === 'WacrmReply'" />
      <wacrm-dynamic v-if="aside === 'WacrmDynamic'" />
      <a-mass v-if="aside === 'AMass'" />

      <div class="close" v-if="aside !== 'index'" @click="close">
        <img src="@/images/close.svg" alt="" onload="SVGInject(this)" />
      </div>
    </div>
  </div>
</template>

<script>
import WacrmDynamic from "./dynamic/wacrm-dynamic.vue";
import Profile from "./user/profile.vue";
import WacrmLabel from "./label/wacrm-label.vue";
import WacrmReply from "./reply/wacrm-reply.vue";
import Welcome from "./welcome/welcome.vue";
import GroupChat from "./group/group-chat.vue";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import AMass from './a-mass/a-mass.vue';
TimeAgo.addDefaultLocale(en);

export default {
  components: {
    Profile,
    WacrmLabel,
    Welcome,
    WacrmReply,
    WacrmDynamic,
    GroupChat,
    AMass,
  },
  name: "wacrm-main",
  props: {
    asideName: String,
    config: Object,
    bottomBar: Object,
    userContact: Object,
    groupContact: Object,
    pag: String,
  },
  data() {
    return {
      aside: "index",
      isPopUp: false,
      aboutLink: `https://restsend.com/?_v=wacrm_${process.env.WACRM_VERSION}&_i=${window.waAPI.meId}`,
    };
  },
  watch: {
    asideName(val) {
      this.aside = val;
      if (val !== "index") {
        this.isPopUp = true;
      } else {
        this.isPopUp = false;
      }
    },
  },
  mounted() {},
  methods: {
    close() {
      this.aside = "index";
      this.$emit("asideNameIndex", "index");
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-main {
  width: 100%;
  height: 100%;
  position: relative;
  .pop-up {
    position: absolute;
    width: 100%;
    height: calc(100% - 59px);
    padding: 10px;
    bottom: calc(-100% + 59px);
    background-color: #fff;
    transition: bottom 0.6s;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }
  .nullPag {
    height: 100%;
    .logo {
      height: 59px;
      background-color: var(--panel-header-background);
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: rgba(56, 56, 56, 1);
      font-size: 18px;
      position: relative;
      .img {
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
      a {
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        color: rgb(10, 159, 245);
      }
    }

    .content {
      height: calc(100% - 59px);
      padding: 20px;
      .title {
        display: block;
        color: rgba(56, 56, 56, 1);
        font-size: 18px;
        margin-bottom: 15px;
      }
      .title-botttom {
        margin-top: 40px;
      }

      p {
        color: rgba(128, 128, 128, 1);
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        i {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          font-size: 16px;
          font-style: normal;
          width: 20px;
          height: 20px;  
        }
        span{
          display: block;
          width: calc(100% - 30px);
        }
      }

      .bgimg {
        width: 230px;
        height: 230px;
        margin: 100px auto 0;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>