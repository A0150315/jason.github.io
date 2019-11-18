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
      return (
        `<section style="display: inline-block;vertical-align: middle;line-height: 0;box-sizing: border-box;height: ${this.height}px;">
  <section style="box-sizing: border-box;height: 100%;" powered-by="xiumi.us">
    <section style="background-image: url(&quot;${this.backgroundUrl}&quot;);background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;background-attachment: scroll;width: 100%;margin-left: auto;margin-right: auto;box-sizing: border-box;">
    </section>
  </section>
  <section style="box-sizing: border-box;margin-top: - ${this.height}px;height:  ${this.height}px;">
    <svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg" style="background-image: url(&quot;${this.coverUrl}&quot;);">
      <animate attributeName="width" style="box-sizing: border-box;" fill="freeze" to="0" from="1" duration="0.01" begin="click + 0.01s">
      </animate>
      <animate attributeName="opacity" style="box-sizing: border-box;" fill="freeze" dur="0.01" begin="click" from="1" to="0">
      </animate>
    </svg>
  </section>
</section>`)
    }
  },

  methods: {
    initClipboard() {
      this.clipboard = new ClipboardJS('.btn');
      this.clipboard.on('success', function (e) {
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