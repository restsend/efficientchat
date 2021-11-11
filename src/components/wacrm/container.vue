<template>
  <div v-if="reFresh" class="container">
    <div class="admin" v-if="view !== 'login'">
      <function-page
        @asideNameIndex="asideNameIndexs"
        :asideName="asideName"
        :config="config"
        :bottomBar="bottomBar"
        :pag="pag"
        :userContact="userContact"
        :groupContact="groupContact"
      />

      <bottom-bar
        :asideNameIndex="asideNameIndex"
        @synchronous="synchronous"
        @asideName="asideNames"
        ref="bottomBar"
      />
    </div>
  </div>
</template>

<script>
import WacrmAside from "../aside/aside.vue";
import BottomBar from "../bottombar/bottombar.vue";
import FunctionPage from "./function-page.vue";
import { createFastReply } from "@/components/fastreply/index";

export default {
  components: { WacrmAside, BottomBar, FunctionPage },
  name: "container",
  props: { config: Object },
  data() {
    return {
      asideName: "index",
      view: "",
      asideNameIndex: "",
      bottomBar: null,
      userContact: null,
      groupContact: null,
      pag: "",
      reFresh: true,
    };
  },
  mounted() {
    this.$root.clip.onOpenUser = this.handleOpenUser;
    this.$root.clip.onCloseUser = this.handleCloseUser;

    this.$root.clip.onOpenGroup = this.handleOpenGroup;
    this.$root.clip.onCloseGroup = this.handleCloseGroup;

    this.bottomBar = this.$refs.bottomBar;
  },
  methods: {
    handleOpenUser(contact) {
      createFastReply(this.$root.clip);

      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
        this.userContact = contact;
        this.pag = "Profile";
      });
    },
    handleCloseUser() {
      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
        this.pag = "";
      });
    },

    handleOpenGroup(contact) {
      createFastReply(this.$root.clip);

      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
        this.groupContact = contact;
        this.pag = "Group";
      });
    },

    handleCloseGroup() {
      this.reFresh = false;
      this.$nextTick(() => {
        this.reFresh = true;
        this.pag = "";
      });
    },

    asideNames(name) {
      this.asideName = name;
      this.asideNameIndex = name;
    },
    synchronous(name) {
      this.view = "login";
    },
    backto() {
      this.view = "";
    },
    asideNameIndexs(val) {
      this.asideNameIndex = val;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 0 0 62px;
  position: relative;
  z-index: 2;
  border-left: 1px solid #999999;
  .admin {
    height: 100%;
  }
  .shrinkage {
    width: 20px;
    height: 80px;
    position: absolute;
    left: -20px;
    top: calc((100% - 80px) / 2);
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-default);
  }
}
</style>