<template>
  <div class="topic">
    {{serialNumber}}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TopicBlock extends Vue {
  @Prop({ default: "0" }) private serialNumber?: string;
  @Prop({ default: "0" }) private data?: Topic.Data;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
