<template>
  <div class="fastreply">
    <fastreply-show
      v-if="fastreplyName === 'fastreplyShow'"
      @fastreplyName="fastreplyNames"
    />
    <fastreply-edit
      v-if="fastreplyName === 'FastreplyEdit'"
      @fastreplyName="fastreplyNames"
      @editFastreply="editFastreply"
    />
    <fastreply-add
      v-if="fastreplyName === 'FastreplyAdd'"
      @fastreplyName="fastreplyNames"
      :fastreplyText="fastreplyText"
      :pos="pos"
    />
  </div>
</template>

<script>
import FastreplyAdd from "./fastreply-add.vue";
import FastreplyEdit from "./fastreply-edit.vue";
import fastreplyShow from "./fastreply-show.vue";
export default {
  components: { fastreplyShow, FastreplyEdit, FastreplyAdd },
  name: "fastreply",
  data() {
    return {
      fastreplyName: "fastreplyShow",
      fastreplyText:"",
      pos:-1
    };
  },
  methods: {
    fastreplyNames(name) {
      this.fastreplyName = name;
      this.pos=-1;
      this.fastreplyText=""
    },
    editFastreply(name,text,index){
       this.fastreplyName = name;
       this.fastreplyText=text;
       this.pos=index
    },
    stop(){
    }
  },
};
</script>

<style lang="less" scoped>
.fastreply {
  width: 260px;
  height: 304px;
  color: rgba(80, 80, 80, 1);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  position: absolute;
  bottom: 50px;
  left: 0;
  margin-bottom: 8px;
}
</style>