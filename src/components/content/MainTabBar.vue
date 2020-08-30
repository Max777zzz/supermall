<template>
  <div class="MainTabBar">
    <tab-bar>
      <tab-bar-item path="/home">
        <span slot="item-icon" class="iconfont icon-71shouye-"></span>
        <div slot="item-name">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <span slot="item-icon" class="iconfont icon-77dianpu"></span>
        <div slot="item-name">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <span slot="item-icon" class="iconfont icon-74gouwu"></span>
        <div slot="item-name">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <span slot="item-icon" class="iconfont icon-5wo"></span>
        <div slot="item-name">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from '../common/tabbar/TabBar'
import TabBarItem from '../common/tabbar/TabBarItem'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem,
  },
}
</script>

<style scoped></style>
