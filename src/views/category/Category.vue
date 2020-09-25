<template>
  <div id="Category">
    <nav-bar><div slot="center">分类</div></nav-bar>
    <div class="content">
      <tab-menu />
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'Category',
  components: {
    NavBar,
  },
}
</script>

<style scoped>
.wrapper {
  height: 300px;
  background-color: blueviolet;
  /* overflow: hidden; */
}
</style>
