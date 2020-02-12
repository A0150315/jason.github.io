<template>
  <div class="what-will-i-eat" v-html="html" />
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
