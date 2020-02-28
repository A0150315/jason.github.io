<template>
  <div class="md-layout"
       v-html="html" />
</template>
<script lang="ts">
import Vue from 'vue';
import { getBlogsDetails } from '@/core/utils';
import marked from 'marked';

import { DATA } from '@/configs/blogs';
import { appName } from '@/configs/app';

export default Vue.extend({
  computed: {
    html() {
      return marked(getBlogsDetails(this.$route?.params?.id), {
        sanitize: true
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    document.title = DATA[+to?.params?.id].name;
    next();
  },
  mounted() {
    sessionStorage.tempTitle = document.title;
    document.title = DATA[+this.$route?.params?.id].name;
  },
  destroyed() {
    document.title = sessionStorage.tempTitle || appName;
    sessionStorage.removeItem('tempTitle');
  }
});
</script>
<style lang="scss" scoped>
.md-layout {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  line-height: 1.5;
  word-wrap: break-word;
  width: 100%;
  padding: 15px;
  overflow: visible;
  font-size: 14px;
  &:after,
  &:before {
    display: table;
    content: "";
  }
  & > :first-child {
    margin-top: 0 !important;
  }
}
</style>
<style lang="scss">
.md-layout {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
  }

  blockquote,
  details,
  dl,
  ol,
  p,
  pre,
  table,
  ul {
    margin-top: 0;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 1.25em;
  }

  ol,
  ul {
    padding-left: 2em;
  }

  li {
    word-wrap: break-all;
    // list
    &:not(.task-list-item) {
      margin-left: 26px;
    }
    & + li {
      margin-top: 0.25em;
    }
  }

  ul:not(.contains-task-list) li {
    margin-left: 0;
  }

  img {
    max-width: 100%;
    box-sizing: initial;
    background-color: #fff;
  }

  blockquote {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    & > :first-child {
      margin-top: 0;
    }
    & > :last-child {
      margin-bottom: 0;
    }
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
    margin-bottom: 0;
    word-break: normal;
  }

  code{
    background-color: initial !important;
    box-shadow: initial !important;
    color: #6a737d !important;
    &::before{
      content: '' !important;
    }
  }
}
</style>
