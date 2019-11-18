<template>
  <div class="generate-svg">
    <ul>
      <li>请输入第一张图片的地址：<input type="text"
               v-model="backgroundUrl"></li>
      <li>请输入第二张图片的地址：<input type="text"
               v-model="coverUrl"></li>
      <li>请设置高度：<input type="number"
               v-model="height"> 像素(px)</li>
      <li>请设置宽度：<input type="number"
               v-model="width"> 像素(px)</li>
    </ul>
    <button class="btn"
            data-clipboard-text="Just because you can doesn't mean you should — clipboard.js">点击复制代码</button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { VegetarianDishList, ChivesList, CookMethodsList } from "@/configs/what-will-i-eat";
import { randomNumber } from "@/core/utils";
import ClipboardJS from 'clipboard';

export default Vue.extend({

  data() {
    return {
      coverUrl: '',
      backgroundUrl: '',
      height: null,
      width: null,
      clipboard: null
    }
  },

  methods: {
    initClipboard() {
      this.clipboard = new ClipboardJS('.btn');
    }
  },

  mounted() {
    console.log('1', 1)
  },
  beforeDestroy() {

  }

})
</script>