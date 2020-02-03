<template>
  <div class="container">
    <header>
      <router-link to="/what-will-i-eat/index">
        今天吃什么
      </router-link>
      <router-link to="/generate-svg/index">
        生成文字点击新图
      </router-link>
    </header>
    <slot />
  </div>
</template>
<script>
export default {};
</script>
