<template>
  <div :class="['topic', { topic__error: Object.values(errorMap)[0] }]">
    <p class="title">#{{ serialNumber }}、{{ data.title }}</p>
    <main class="options-block">
      <a
        :class="[
          'options',
          { options__selected: opt.id === selectedOpitonsID },
          { options__error: errorMap[opt.id] }
        ]"
        v-for="(opt, index) in data.options"
        :key="opt.id"
        @click="() => optionsHandler(opt.id)"
      >
        {{ optionsSymbol[+index] }}
        、{{ opt.name }}
      </a>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { optionsSymbol } from './configs';

@Component
export default class TopicBlock extends Vue {
  // state
  optionsSymbol = optionsSymbol;
  selectedOpitonsID = -1;

  @Prop({ default: '0' }) private serialNumber!: string;
  @Prop({ default: { '-1': false } }) private errorMap!: {
    [id: string]: boolean;
  };
  @Prop({ default: () => undefined }) private onChange!: (id: number) => void;
  @Prop({
    default: () => ({
      title: '标题',
      id: 0,
      options: [
        {
          id: 1,
          name: '选项1'
        },
        {
          id: 2,
          name: '选项2'
        },
        {
          id: 3,
          name: '选项3'
        },
        {
          id: 4,
          name: '选项4'
        }
      ]
    })
  })
  private data!: Topic.Data;

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
  margin-bottom: 50px;
  &__error::after {
    background: url('./state.png') -195px -77px no-repeat;
    content: '\20';
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 110px;
    height: 85px;
  }
}
.title {
  font-size: $fontsize-big;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: left;
}
.options-block {
  @extend %flexWrap;
  padding-left: 40px;
  & > .options {
    width: 50%;
  }
}
.options {
  cursor: pointer;
  font-size: $fontsize-small;
  text-align: left;
  position: relative;
  margin-bottom: 20px;
  &:hover {
    color: #000;
  }
  &__selected {
    &::before {
      background: url('./state.png') -75px -140px no-repeat;
      content: '\20';
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
