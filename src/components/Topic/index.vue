<template>
  <div :class="['topic',,{'topic__error':Object.values(errorMap)[0]}]">
    <p>
      #{{serialNumber}}、{{data.title}}
    </p>
    <main class="options-block">
      <div :class="['options',{'options__selected':opt.id===selectedOpitonsID},{'options__error':errorMap[opt.id]}]"
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
  @Prop({ default: "0" }) private serialNumber!: string;
  @Prop({ default: { "-1": false } }) private errorMap!: {
    [id: string]: boolean;
  };
  @Prop({ default: () => {} }) private onChange!: (id: number) => void;
  @Prop({
    default: () => ({
      title: "我是问题标题",
      id: 1,
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
  private data!: Topic.Data;

  // state
  optionsSymbol = optionsSymbol;
  selectedOpitonsID = -1;

  // methods
  optionsHandler(id: number) {
    this.selectedOpitonsID = id;
    this.onChange(id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.topic {
  position: relative;
  &__error::after {
    background: url("./state.png") -195px -77px no-repeat;
    content: "\20";
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 110px;
    height: 85px;
  }
}
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
  &__error {
    &::before {
      background-position: -75px -76px;
    }
  }
}
</style>
