<template>
  <div class="home">
    <Topic
      v-for="(topic, index) in topicList"
      :key="index"
      :data="topic"
      :serialNumber="index + 1"
      :errorMap="errorList[index]"
      :onChange="topicHandler(index)"
    />
    <button
      @click="submitAndCheck"
      @mousedown="isSubmitBtnPressing = true"
      :class="['button', { button__down: isSubmitBtnPressing }]"
    >
      提交
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Topic from '@/components/Topic/index.vue'; // @ is an alias to /src
import topicList from '@/assets/data';

@Component({
  components: {
    Topic
  }
})
export default class Home extends Vue {
  // state
  isPass = false;
  isSubmitBtnPressing = false;
  topicList = topicList;
  answerList: number[] = new Array(topicList.length);
  errorList: { [id: string]: boolean }[] = new Array(topicList.length).fill({});

  // method
  topicHandler(index: number) {
    return (answerId: number) => {
      this.$set(this.answerList, index, answerId);
    };
  }
  submitAndCheck() {
    let isPass = true;
    // 检查是否填写完整
    for (let i = 0; i < this.answerList.length; i++) {
      if (this.answerList[i] === undefined) {
        alert(`第${i + 1}题还未填写`);
        return;
      }
    }
    // 检查是否正确
    for (let i = 0; i < this.answerList.length; i++) {
      const isError = this.answerList[i] !== topicList[i].answer;
      if (isError) {
        isPass = false;
      }
      if (!isError) this.isPass = true;
      this.$set(this.errorList, i, {
        [this.answerList[i]]: isError
      });
    }
    this.isPass = isPass;
  }
  submitBtnPressUp() {
    this.isSubmitBtnPressing = false;
  }

  protected mounted() {
    document.addEventListener('mouseup', this.submitBtnPressUp);
  }
  protected destroy() {
    document.removeEventListener('mouseup', this.submitBtnPressUp);
  }
}
</script>

<style lang="scss" scoped>
.home {
  @extend %plaidBackground;
  width: 900px;
  margin: 20px auto;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.21);
  padding: 16px 24px;
  box-sizing: border-box;
  text-align: center;
}
.button {
  background-color: #96c120;
  border: none;
  outline: none;
  width: 200px;
  color: #fff;
  font-size: $fontsize-large;
  height: 40px;
  border-radius: 2px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.21);
  cursor: pointer;
  &__down {
    background-color: #7fa31d;
  }
}
</style>
