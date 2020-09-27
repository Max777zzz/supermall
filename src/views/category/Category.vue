<template>
  <div id="Category">
    <nav-bar
      ><div slot="center">
        分类
      </div></nav-bar
    >
    <div class="content">
      <tab-menu :categories="getCategories" @selectItem="selectItem" />
      <scroll
        id="tab-content"
        :data="[categoryData]"
        :probe-type="3"
        @scroll="contentScroll"
      >
        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          ref="tabControl1"
          :class="{ isfixed: isFixed }"
          v-show="isShow"
          class="tab-control"
        />

        <tab-control
          :titles="['综合', '新品', '销量']"
          @tabClick="tabClick"
          ref="tabControl2"
          :class="{ isfixed: isFixed }"
        />
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/TabControl'
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
    Scroll,
    TabMenu,
    TabControl,
  },
  created() {
    this._getCategory()
  },
  data() {
    return {
      getCategories: [],
      getSubcategories: [],
      getCategoryDetail: [],
      categoryData: {},
      currentIndex: -1,
      isFixed: false,
      isShow: false,
      currentType: 'pop',
      tabOffsetTop: 0,
    }
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        this.getCategories = res.data.category.list
        console.log(this.getCategories)
        for (let i = 0; i < this.getCategories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          }
        }
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index
      const mailKey = this.getCategories[index].maitKey
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data
        console.log(this.categoryData[index].subcategories)
        this.categoryData = { ...this.categoryData }
        console.log(this.categoryData)
        // this._getCategoryDetail('pop')
        // this._getCategoryDetail('sell')
        // this._getCategoryDetail('new')
      })
    },
    selectItem(index) {
      this._getSubcategories(index)
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    contentScroll(position) {
      this.isFixed = -position.y > this.$refs.tabContro2.$el.offsetTop
      this.isShow = -position.y > this.$refs.tabControl2.$el.offsetTop
      // console.log(position)
      console.log(this.$refs.tabControl2.$el.offsetTop)
    },
    swiperImageLoad() {
      // 2.获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    // showCategoryDetail() {
    //   if (this.currentIndex === -1) return []
    //   return this.categoryData[this.currentIndex].categoryDetail[
    //     this.currentType
    //   ]
    // },
  },
}
</script>

<style scoped>
.wrapper {
  height: 100%;
  background-color: blueviolet;
  /* overflow: hidden; */
}
#category {
  height: 100vh;
}

.nav-bar {
  background-color: blueviolet;
  font-weight: 700;
  color: #fff;
  z-index: 999;
  position: fixed;
  width: 100%;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;

  display: flex;
}

#tab-content {
  height: 100%;
  flex: 1;
}

.isfixed {
  color: red;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>
