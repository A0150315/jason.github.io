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
            :data-clipboard-text="clipboardText">点击复制代码</button>
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
      height: 0,
      width: 0,
      clipboard: null
    }
  },

  computed: {
    clipboardText() {
      const rate = (this.height / this.width * 100).toFixed(2)
      return (
        `<p><br></p>
<section style="text-align: justify;display: inline-block;">
  <section style="display: inline-block;vertical-align: middle;line-height: 0;box-sizing: border-box;width: ${this.width}px;">
    <section style="background-image: url(&quot;${this.backgroundUrl}&quot;);background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;background-attachment: scroll;width: 100%;margin-left: auto;margin-right: auto;box-sizing: border-box;height: 0;padding-bottom: ${rate}%;">
    </section>
    <section style="box-sizing: border-box;margin-top: -${rate}%;height: 0;padding-bottom:  ${rate}%;">
      <svg style="background-image: url(&quot;${this.coverUrl}&quot;);background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;background-attachment: scroll;width: 100%;margin-left: auto;margin-right: auto;box-sizing: border-box;height: 0;padding-bottom:${rate}%;" xmlns="http://www.w3.org/2000/svg" width="1">
        <animate attributeName="width" style="box-sizing: border-box;" fill="freeze" to="0" from="1" duration="0.01" begin="click + 0.01s">
        </animate>
        <animate attributeName="opacity" style="box-sizing: border-box;" fill="freeze" dur="0.01" begin="click" from="1" to="0">
        </animate>
      </svg>
    </section>
  </section>
</section>
<p><br></p>`)
    }
  },

  methods: {
    initClipboard() {
      this.clipboard = new ClipboardJS('.btn');
      this.clipboard.on('success', (e) => {
        alert('复制成功')

        e.clearSelection();
      });
    }
  },

  mounted() {
    this.initClipboard()
  },
  beforeDestroy() {
    this.clipboard.destroy()
  }

})
</script>