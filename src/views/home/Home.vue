<template>
  <div id="home">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
    <home-feature></home-feature>
    <tab-control :titles="titles" @tabClick="tabClick"></tab-control>
    <goods-list :goods="goods[currentType].list"></goods-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import TabControl from 'components/content/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommend from './childComponents/HomeRecommend'
import HomeFeature from './childComponents/HomeFeature'

import { getHomeMultidata, getHomeGoods } from 'network/home'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
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
  padding-top: 44px;
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
}
</style>
