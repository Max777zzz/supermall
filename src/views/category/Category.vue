<template>
  <div id="Category">
    <nav-bar><div slot="center" @click="_getCategory">分类</div></nav-bar>
    <div class="content">
      <tab-menu />
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComponents/TabMenu'

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from 'network/category.js'

export default {
  name: 'Category',
  components: {
    NavBar,
    TabMenu,
  },
  data() {
    return {
      getCategories: [],
      getSubcategories: [],
      getCategoryDetail: [],
    }
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // this.getCategories = res.data.getCategory.list
        console.log(res)
      })
    },
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
