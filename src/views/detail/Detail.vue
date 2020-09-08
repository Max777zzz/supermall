<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <scroll class="content" ref="Scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
import DetailSwiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo'

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop } from 'network/detail.js'
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
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
    })
  },
  methods: {
    imageLoad() {
      this.$refs.Scroll.refresh()
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
  height: calc(100% - 44px);
}
</style>
