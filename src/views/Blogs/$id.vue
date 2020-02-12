<template>
  <div class="what-will-i-eat" v-html="html" />
</template>
<script lang="ts">
import Vue from 'vue';
import { getBlogsDetails } from '@/core/utils';
import marked from 'marked';

import { DATA } from '@/configs/blogs';

export default Vue.extend({
  computed: {
    html() {
      return marked(getBlogsDetails(this.$route?.params?.id), {
        sanitize: true
      });
    }
  }
});
</script>
