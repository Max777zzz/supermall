<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" />
    <scroll class="content" ref="Scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo" />
      <goods-list class="goodsList" :goods="recommends" />
    </scroll>
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

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { debounce } from 'common/utils.js'

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from 'network/detail.js'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
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
    }),
      getRecommend().then((res) => {
        this.recommends = res.data.list
      })
  },
  mounted() {
    const refresh = debounce(this.$refs.Scroll.refresh, 500)
    this.$bus.$on('itemImgLoad', () => {
      refresh()
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
  overflow: hidden;
}
.goodsList {
  padding: 10px 0;
}
</style>
