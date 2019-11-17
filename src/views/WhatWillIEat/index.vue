<template>
  <div class="what-will-i-eat">
    <h1>素菜</h1>
    <ul>
      <li v-for="(vegetarianDish,index) in VegetarianDishList"
          :key="index">
        {{vegetarianDish}}
      </li>
    </ul>
    <h1>荤菜</h1>
    <ul>
      <li v-for="(chives,index) in ChivesList"
          :key="index">
        {{chives}}
      </li>
    </ul>
    <h1>烹饪方式</h1>
    <ul>
      <li v-for="(method,index) in CookMethodsList"
          :key="index">
        {{method}}
      </li>
    </ul>
    <button @click="getResult">
      来吧
    </button>
    <p>
      {{result}}
    </p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { VegetarianDishList, ChivesList, CookMethodsList } from "@/configs/what-will-i-eat";
import { randomNumber } from "@/core/utils";


export default Vue.extend({

  data() {
    return {
      VegetarianDishList,
      ChivesList,
      CookMethodsList,
      result: ''
    }
  },

  methods: {
    getResult() {
      const vegetarianDishIndex = (randomNumber(0, this.VegetarianDishList.length - 1));
      const chivesIndex = (randomNumber(0, this.ChivesList.length - 1));
      const cookMethodIndex = (randomNumber(0, this.CookMethodsList.length - 1));
      this.result = `
        ${this.VegetarianDishList[vegetarianDishIndex]}
        ${this.CookMethodsList[cookMethodIndex]}
        ${this.ChivesList[chivesIndex]}
      `
    }
  },
})
</script>