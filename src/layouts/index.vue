<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <v-icon>mdi-alert-circle-outline</v-icon>
              <span class="body-2 black--text"> BUILDING...</span>
              <!-- <a href="#!" class="body-2 black--text">EDIT</a> -->
            </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" :to="item.to" replace>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="green darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">This is Cupertino UI</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn href="https://github.com/A0150315" icon large v-on="on" target="_blank">
            <v-avatar size="32px" item>
              <v-img
                src="https://avatars3.githubusercontent.com/u/18693417?s=40&v=4"
                alt="avatars"
              />
            </v-avatar>
          </v-btn>
        </template>
        <span>My Github</span>
      </v-tooltip>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <!-- <v-row justify="center">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn to="/what-will-i-eat/index" icon large v-on="on">
                <v-icon large>mdi-code-tags</v-icon>
              </v-btn>
            </template>
            <span>今天吃什么</span>
          </v-tooltip>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon large to="/generate-svg/index" v-on="on">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
            </template>
            <span>Codepen</span>
          </v-tooltip>
        </v-row> -->
        <v-row>
          <slot />
        </v-row>
      </v-container>
      <v-btn bottom color="red" dark fab fixed right @click="dialog = !dialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      drawer: true,
      dialog: false,
      items: [
        { icon: 'mdi-contacts', text: 'Home', to: '/' },
        {
          icon: 'mdi-history',
          text: 'What Will I Eat',
          to: '/what-will-i-eat/index'
        },
        {
          icon: 'mdi-content-copy',
          text: 'Generate SVG',
          to: '/generate-svg/index'
        },
        { divider: true },
        { heading: 'Blogs' },
        { icon: 'mdi-@', text: 'Article 1' },
        { icon: 'mdi-@', text: 'Article 2' },
        { icon: 'mdi-@', text: 'Article 3' },
        { icon: 'mdi-@', text: 'Article 4' }
        // {
        //   icon: 'mdi-chevron-up',
        //   'icon-alt': 'mdi-chevron-down',
        //   text: '',
        //   model: false,
        //   children: [{ icon: 'mdi-@', text: 'Create label' }]
        // }
      ]
    };
  }
});
</script>
