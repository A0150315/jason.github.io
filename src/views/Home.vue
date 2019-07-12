<template>
  <div class="home">
    <Topic data="{{}}" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Topic from '@/components/Topic.vue'; // @ is an alias to /src

@Component({
  components: {
    Topic,
  },
})
export default class Home extends Vue {}
</script>
