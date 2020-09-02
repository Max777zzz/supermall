<template>
  <div id="home">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="Scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control :titles="titles" @tabClick="tabClick" />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <!-- 修饰符 .native 监听组件根元素的原生事件 -->
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommend from './childComponents/HomeRecommend'
import HomeFeature from './childComponents/HomeFeature'

import { getHomeMultidata, getHomeGoods } from 'network/home'

import BackTop from 'components/content/backTop/BackTop'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      isShow: false,
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata(),
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
  },
  methods: {
    // 事件监听
    tabClick(index) {
      console.log(index)
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
    },
    backClick() {
      this.$refs.Scroll.scrollTop(0, 0)
    },
    contentScroll(position) {
      this.isShow = -position.y > 1000
    },

    // 网络请求
    getHomeMultidata() {
      getHomeMultidata().then(
        (res) => {
          console.log(res)
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        },
        (err) => {
          console.log(err)
        }
      )
    },
    getHomeGoods(type, num) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(
        (res) => {
          console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        },
        (err) => {
          console.log(err)
        }
      )
    },
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}
</style>
