<template>
  <div class="home">
    <Topic v-for="(topic,index) in topicList"
           :key="topic.id"
           :data="topic"
           :serialNumber="index+1"
           :errorMap="errorList[index]"
           :onChange="topicHandler(index)" />
    <button @click="submitAndCheck">提交</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Topic from "@/components/Topic/index.vue"; // @ is an alias to /src
import topicList from "@/assets/data";

@Component({
  components: {
    Topic
  }
})
export default class Home extends Vue {
  // state
  isPass = false;
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
    for (let i = 0; i < this.answerList.length; i++) {
      if (this.answerList[i] === undefined) {
        alert(`第${i + 1}题还未填写`);
        return;
      }
    }
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
}
</script>
