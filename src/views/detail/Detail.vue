<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" />
    <scroll class="content" ref="Scroll" @scroll="contentScroll" :probeType="3">
      <ul>
        <li v-for="item in $store.state.cartList" :key="item.iid">
          {{ item }}
        </li>
      </ul>
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list class="goodsList" :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from './childComponents/DetailCommentInfo'
import DetailBottomBar from './childComponents/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { debounce } from 'common/utils.js'
import { itemListenerMixin, backTopMixin } from 'common/mixin.js'

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from 'network/detail.js'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      TopYs: [],
      getTopYs: null,
      currentIndex: 0,
    }
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid

    // 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res)

      // 获取顶部轮播图片
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )

      // 获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )

      // 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list
    })
    // 对getTopYs赋值的操作进行防抖操作
    this.getTopYs = debounce(() => {
      this.TopYs = []
      this.TopYs.push(0)
      this.TopYs.push(this.$refs.params.$el.offsetTop)
      this.TopYs.push(this.$refs.comment.$el.offsetTop)
      this.TopYs.push(this.$refs.recommends.$el.offsetTop)
      this.TopYs.push(Number.MAX_VALUE)

      console.log(this.TopYs)
    })
  },
  destroyed() {
    // 取消全局事件监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
    imageLoad() {
      this.$refs.Scroll.refresh()
      this.getTopYs()

      // 图片加载完后
      // this.TopYs = []
      // this.TopYs.push(0)
      // this.TopYs.push(this.$refs.params.$el.offsetTop)
      // this.TopYs.push(this.$refs.comment.$el.offsetTop)
      // this.TopYs.push(this.$refs.recommends.$el.offsetTop)

      // console.log(this.TopYs)
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.Scroll.scrollTop(0, -this.TopYs[index] + 42)
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y

      // position和标题的值进行对比
      // [0,7938,9120,9452]
      // 0~7938 0     7938~9120 1     9120~9452 2     9452>Number.MAN_VALUE 3
      let length = this.TopYs.length
      // 普通写法
      // for (let i = 0; i < length; i++) {
      // if (
      //   this.currentIndex !== i &&
      //   ((i < length - 1 &&
      //     positionY >= this.TopYs[i] &&
      //     positionY < this.TopYs[i + 1]) ||
      //     (i === length - 1 && positionY >= this.TopYs[i]))
      // ) {
      //   this.currentIndex = i
      //   console.log(this.currentIndex)
      // }

      // hark写法
      // 在 TopYs 中添加一个无限大的值，使其变成四个区间
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.TopYs[i] &&
          positionY < this.TopYs[i + 1]
        ) {
          this.currentIndex = i
          // console.log(this.currentIndex)
        }
      }

      //  是否显示回到顶部
      this.isShow = -position.y > 1000
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.iid = this.iid
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice

      // 2.将商品添加到购物车
      // this.$store.commit('addCart', product)
      // 最好通过actions异步操作，可以监听到数据变化
      this.$store.dispatch('addCart', product)
    },
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
.goodsList {
  padding: 10px 0 0 0;
}
</style>
