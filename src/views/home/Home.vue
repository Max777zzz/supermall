<template>
  <div id="home">
    <nav-bar>
      <div slot="center">Lemon小铺</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="titles"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="Scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <home-feature />
      <tab-control ref="tabControl2" :titles="titles" @tabClick="tabClick" />
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

import { itemListenerMixin } from 'common/mixin.js'

import BackTop from 'components/content/backTop/BackTop'
export default {
  name: 'Home',
  mixins: [itemListenerMixin],
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata(),
      // 2.请求商品数据
      this.getHomeGoods('pop'),
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
  },
  mounted() {
    // 图片加载完成的事件监听

    // 获取tabControl的offsetTop
    this.$bus.$on('swiperImageLoad', () => {
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.swiperImageLoad()
    })
  },
  destroyed() {
    // console.log('home destroyed')
    // 取消全局事件监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  activated() {
    this.$refs.Scroll.scrollTop(0, this.saveY, 0)
    this.$refs.Scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.Scroll.getScrollY()
    // console.log(this.saveY)
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.Scroll.scrollTop(0, 0)
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShow = -position.y > 1000

      // 决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then((res) => {
        console.log(res)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 完成上拉加载更多
        this.$refs.Scroll.finishPullUp()
      })
    },
  },
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.tab-control {
  position: relative;
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
