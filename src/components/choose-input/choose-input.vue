<template>
  <div ref="chooseInput" class="choose-input">
    <input :disabled="disabled" :type="type" :name="name" v-model="data" :value="value" :id="id" :style="disabled?'cursor:not-allowed;':''" />
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "choose-input",
  model: {
    prop: "checked",
    event: "change",
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "radio",
    },
    name: {
      type: String,
      required: false,
      default: "radio",
    },
    value: {
      type: [String,Number],
      required: false,
      default: "",
    },
    checked: {
      type: [Boolean, String, Array],
      required: false,
    },
    width:{
      type: Number,
      required: false,
      default: 15,
    },
    checkedColor:{
      type: String,
      required: false,
      default: "blue",
    },
    fontSize:{
      type: Number,
      required: false,
      default: 14,
    },
    disabled:Boolean
  },
  watch: {
    checked: {
      handler(val) {
        this.data=val
      },
      deep: true,
    },
    data(val) {
      this.$emit("change", val);
    },
  },
  data() {
    return {
      data: this.checked,
    };
  },
  mounted() {
    this.setCheckedProperty();
  },
  methods: {
    setCheckedProperty() {
      this.$refs.chooseInput.style.setProperty(
        "--checkedColor",
        this.checkedColor
      );
      this.$refs.chooseInput.style.setProperty("--width", this.width+"px");
      this.$refs.chooseInput.style.setProperty("--fontSize", this.fontSize+"px");
    },
  },
};
</script>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
}

label {
  font-size: var(--fontSize);
}

input[type="radio"],
input[type="checkbox"] {
  display: inline-block;
  vertical-align: middle;
  width: var(--width);
  height: var(--width);
  margin: 0;
  -webkit-appearance: none;
  background-color: transparent;
  border: 0;
  outline: 0 !important;
  line-height: 20px;
  color: #d8d8d8;
  border: 1px solid #999999;
}

input[type="radio"] {
  border-radius: 50%;
}

input[type="radio"]:checked {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e");
  background-color: var(--checkedColor);
  border-color: var(--checkedColor);
}

input[type="checkbox"] {
  border-radius: 3px;
}

input[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e");
  background-color: var(--checkedColor);
  border-color: var(--checkedColor);
}
</style>

