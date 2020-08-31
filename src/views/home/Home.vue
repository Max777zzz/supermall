<template>
  <div class="home">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommend from './childComponents/HomeRecommend'
import { getHomeMultidata } from 'network/home'
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    }
  },
  created() {
    // 1.请求多个数据
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
}
</script>

<style scoped></style>
