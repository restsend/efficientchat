<template>
  <div class="wacrm-label-edit">
    <h3><span>*</span>Tag group name</h3>
    <el-input
      type="text"
      
      v-model="name"
      maxlength="15"
      show-word-limit
      :class="{red:flag}"
    ></el-input>
    <p :style="{opacity:flag?1:0}" style="margin:5px 0 5px;font-size:12px;color:red">Tag group name cannot be empty.</p>

    <h3><span>*</span>Tags</h3>
    <div class="tag">
      <el-tag
        :key="tag.name"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        :color="color"
        :style="{ borderColor: color }"
        style="color: #fff"
      >
        {{ tag.name }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click.stop="showInput"
        >+</el-button
      >
    </div>

    <div class="color">
      <h3>Tag Color (optional)</h3>
      <div>
        <span
          ><el-color-picker
            v-model="color"
            size="mini"
            :predefine="predefineColors"
          >
            ></el-color-picker
          ></span
        >
      </div>
    </div>

    <div class="btn">
      <el-button size="mini" @click.stop="cancel">Cancel</el-button>
      <el-button type="primary" size="mini" @click.stop="confirm"
        >Save</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "wacrm-label-edit",
  props: { label: Object },
  data() {
    return {
      name: "",
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      color: "#409eff",
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
      ],
      flag:false
    };
  },
  watch: {},
  created() {
    if (Object.keys(this.label).length > 0) {
      this.name = this.label.name;
      this.dynamicTags = this.label.tags;
      this.color = this.label.tags[0].bgColor;
    }
  },
  methods: {
    async handleClose(tag) {
      if (tag.id) {
        await this.$root.clip.tag.delTag(this.label.id, tag.id);
      }
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      // if(aaa){}
      var flag = true;
      this.dynamicTags.forEach((e) => {
        if (e.name === this.inputValue) {
          flag = false;
        }
      });
      if (flag) {
        if (this.inputValue) {
          this.dynamicTags.push({ name: this.inputValue });
        }
        this.inputVisible = false;
        this.inputValue = "";
      } else {
        this.$message({
          message: "Tag names cannot be repeated.",
          type: "warning",
        });
      }
    },
    cancel() {
      this.$emit("labelName", "WacrmLabelShow");
    },

    async confirm() {
      if (this.name !== "") {
        this.flag=false
        if (this.dynamicTags.length !== 0) {
          if (this.label.id) {
            await this.editGroup({
              groupId: this.label.id,
              name: this.name,
            });
          } else {
            await this.addGroup(this.name);
          }
        }else{
          this.$message.error('Tag content cannot be empty.');
        }
      }else{
        this.flag=true
      }
    },
    //Creating a Label Group
    async addGroup(groupName) {
      let group = await this.$root.clip.tag.addGroup(groupName, 0);
      await this.addGroupTags(group.id);
    },
    //Create a label
    async addGroupTags(groupId) {
      for (let index = 0; index < this.dynamicTags.length; index++) {
        let element = this.dynamicTags[index];
        if (!element.id) {
          await this.$root.clip.tag.addTag(
            groupId,
            element.name,
            this.color,
            this.color
          );
        }
      }
      this.$emit("labelName", "WacrmLabelShow");
    },
    //Edit tag Group
    async editGroup(data) {
      await this.$root.clip.tag.editGroup(data.groupId, data.name);
      await this.addGroupTags(data.groupId);
    },
  },
};
</script>

<style lang="less" scoped>
.wacrm-label-edit {
  h3 {
    color: #505050;
    font-size: 14px;
    font-weight: normal;
    display: flex;
    align-items: center;
    margin-top: 13px;
    margin-bottom: 7px;
    span {
      color: #d43030;
      vertical-align: middle;
    }
  }
  .red{
    /deep/ .el-input__inner{
      border-color: red;
    }
    /deep/ .el-input__inner::-webkit-input-placeholder{
          color: red;
        }
  }
  .tag {
    min-height: 30px;
    .el-tag {
      margin-right: 10px;
      margin-bottom: 5px;
      /deep/ .el-icon-close {
        color: #fff;
      }
      /deep/ .el-icon-close:hover {
        background-color: transparent;
      }
      .el-button {
        margin-bottom: 5px;
      }
    }
    .button-new-tag {
      height: 24px;
      margin-right: 10px;
      line-height: 22px;
      padding: 0 10px;
    }
    .input-new-tag {
      width: 90px;
      height: 24px;
      margin-bottom: 5px;
      vertical-align: bottom;
      /deep/ .el-input__inner {
        height: 100%;
      }
    }
  }
  .color {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 18px;
    margin-bottom: 31px;
    h3 {
      margin: 0;
    }
    div {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #505050;
        margin-left: 22px;
        display: flex;
        align-items: center;
        .el-color-picker {
          margin-left: 5px;
        }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>