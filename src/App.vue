<template>
  <v-app>
    <v-app-bar app
               color="primary"
               dark>
    </v-app-bar>
    <v-content>
      <Layout>
        <router-view />
      </Layout>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "./layouts/index.vue";

export default Vue.extend({
  name: "App",

  components: {
    Layout
  },

  data: () => ({
    //
  })
});
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>