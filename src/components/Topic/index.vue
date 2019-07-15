<template>
  <div class="topic">
    <p>
      {{serialNumber}}、{{data.title}}
    </p>
    <main class="options-block">
      <div :class="['options',{'options__selected':opt.id===selectedOpitonsID}]"
           v-for="(opt,index) in data.options"
           :key="opt.id"
           @click="()=>optionsHandler(opt.id)">
        {{optionsSymbol[+index]}}
        、{{opt.name}}
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { optionsSymbol } from "./configs";

@Component
export default class TopicBlock extends Vue {
  @Prop({ default: "0" }) private serialNumber?: string;
  @Prop({
    default: () => ({
      title: "我是问题标题",
      options: [
        {
          id: 1,
          name: "选项1"
        },
        {
          id: 2,
          name: "选项2"
        },
        {
          id: 3,
          name: "选项3"
        },
        {
          id: 4,
          name: "选项4"
        }
      ]
    })
  })
  private data?: Topic.Data;

  // state
  optionsSymbol = optionsSymbol;
  selectedOpitonsID = -1;

  // methods
  optionsHandler(id: number) {
    this.selectedOpitonsID = id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.options-block {
  @extend %flexWrap;
  & > .options {
    width: 50%;
  }
}
.options {
  font-size: $fontsize-small;
  text-align: left;
  position: relative;
  &__selected {
    &::before {
      background: url("./state.png") -75px -140px no-repeat;
      content: "\20";
      display: block;
      width: 42px;
      height: 42px;
      position: absolute;
      top: -10px;
      left: -16px;
    }
  }
}
</style>
