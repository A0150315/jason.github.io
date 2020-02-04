import Vue from 'vue';
// @ts-ignore
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#2E7D32',
        secondary: '#4CAF50'
      }
    }
  }
});
