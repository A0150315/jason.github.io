<template>
  <div class="generate-svg">
    <v-card class="overflow-hidden" color="primary lighten-1" dark>
      <v-toolbar flat color="primary" dark>
        <v-toolbar-title class="font-weight-light"
          >请输入图片相关信息</v-toolbar-title
        >
        <v-spacer />
        <v-icon>mdi-pencil</v-icon>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          color="white"
          v-model="backgroundUrl"
          label="第一张图片的地址"
        />
        <v-text-field
          color="white"
          v-model="coverUrl"
          label="第二张图片的地址"
        />
        <v-text-field
          color="white"
          v-model="decorateUrl"
          label="背景图的地址"
        />
        <v-text-field color="white" v-model="width" label="宽度" />
        <v-text-field color="white" v-model="height" label="高度" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn name="btn" outlined :data-clipboard-text="clipboardText">
          生成可点击图片
        </v-btn>
        <v-btn
          name="btn"
          outlined
          :data-clipboard-text="scrollPicClipboardText"
        >
          生成可滚动图片
        </v-btn>
      </v-card-actions>
      <v-snackbar v-model="hasSussess" :timeout="2000" absolute bottom left>
        复制成功
      </v-snackbar>
    </v-card>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import {
  VegetarianDishList,
  ChivesList,
  CookMethodsList
} from '@/configs/what-will-i-eat';
import { randomNumber } from '@/core/utils';
import ClipboardJS from 'clipboard';

export default Vue.extend({
  data() {
    return {
      coverUrl: '',
      backgroundUrl: '',
      decorateUrl: '',
      height: 0,
      width: 0,
      clipboard: null,
      hasSussess: false
    };
  },

  computed: {
    clipboardText(): string {
      const rate = ((this.height / this.width) * 100).toFixed(2);
      const backgroundUrl = this.backgroundUrl.split('?')[0];
      const coverUrl = this.coverUrl.split('?')[0];
      return `<p><br></p>
<p style="max-height: 0;min-height: 0;overflow: hidden;">
  <img class="rich_pages" data-ratio="1.16640625" data-s="300,640" src="${backgroundUrl}" data-type="jpeg" data-w="1280" style="display:block;height:0 !important" _src="${backgroundUrl}">
</p>
<p style="max-height: 0;min-height: 0;overflow: hidden;">
  <img class="rich_pages" data-ratio="1.16640625" data-s="300,640" src="${coverUrl}" data-type="jpeg" data-w="1280" style="display:block;height:0 !important" _src="${coverUrl}">
</p>
<section style="text-align: justify;display: inline-block;">
  <section style="display: inline-block;vertical-align: middle;line-height: 0;box-sizing: border-box;width: ${this.width}px;">
    <section style="background-image: url(&quot;${backgroundUrl}&quot;);background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;background-attachment: scroll;width: 100%;margin-left: auto;margin-right: auto;box-sizing: border-box;height: 0;padding-bottom: ${rate}%;">
    </section>
    <section style="box-sizing: border-box;margin-top: -${rate}%;height: 0;padding-bottom:  ${rate}%;">
      <svg style="background-image: url(&quot;${coverUrl}&quot;);background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;background-attachment: scroll;width: 100%;margin-left: auto;margin-right: auto;box-sizing: border-box;height: 0;padding-bottom:${rate}%;" xmlns="http://www.w3.org/2000/svg" width="1">
        <animate attributeName="width" style="box-sizing: border-box;" fill="freeze" to="0" from="1" duration="0.01" begin="click + 0.01s">
        </animate>
        <animate attributeName="opacity" style="box-sizing: border-box;" fill="freeze" dur="0.01" begin="click" from="1" to="0">
        </animate>
      </svg>
    </section>
  </section>
</section>
<p><br></p>`;
    },
    scrollPicClipboardText(): string {
      const backgroundUrl = this.backgroundUrl.split('?')[0];
      const coverUrl = this.coverUrl.split('?')[0];
      const decorateUrl = this.decorateUrl.split('?')[0];
      return `<p><br></p>
<section style="width: 100%;border-width: initial;border-color: initial;border-style: none;overflow: hidden;"
    donone="shifuMouseDownPayStyle('shifu_gqixi_012')">
    <section
        style="background-image: url(&quot;${decorateUrl}&quot;);background-position: 50% 50%;background-repeat: no-repeat;background-size: cover;background-attachment: scroll;width: 100%;margin-left: auto;margin-right: auto;">
        <section
            style="display: inline-block;width: 100%;vertical-align: top;overflow: auto;-webkit-overflow-scrolling: touch;">
            <section
                style="display: flex;justify-content: flex-start;align-items: flex-start;width: 200%;min-width: 100%;max-width: 200% !important;">
                <section style="display: inline-block; width: 50%; vertical-align: top;"><img
                        src="${backgroundUrl}"
                        style="width: 100%;visibility: visible;vertical-align: bottom;float: left;" data-type="png"
                        data-ratio="1.4446177847113884" data-w="641"></section>
                <section style="display: inline-block; width: 50%; vertical-align: top;"><img
                        src="${coverUrl}"
                        style="width: 100%;visibility: visible;vertical-align: bottom;" data-type="png"
                        data-ratio="1.4446177847113884" data-w="641">​</section>
            </section>
        </section>
    </section>
</section>
<p><br></p>`;
    }
  },

  methods: {
    initClipboard() {
      this.clipboard = new ClipboardJS('[name="btn"]');
      // @ts-ignore
      this.clipboard.on.call(this.clipboard, 'success', e => {
        alert('复制成功');

        e.clearSelection();
      });
    }
  },

  mounted() {
    this.initClipboard();
  },
  beforeDestroy() {
    // @ts-ignore
    (this.clipboard.destroy as () => void).call(this.clipboard);
  }
});
</script>
<style lang="scss" scoped>
.generate-svg {
  width: 50%;
  margin: 0 auto;
}
</style>
