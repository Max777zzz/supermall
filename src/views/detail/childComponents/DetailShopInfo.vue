<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" />
      <span class="title">{{ shop.name }}</span>
    </div>
    <div class="shop-middle clearfix">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{ shop.sells | sellCountFilter }}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{ shop.goodsCount }}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td class="score" :class="{ 'score-better': item.isBetter }">
              {{ item.score }}
            </td>
            <td class="better" :class="{ 'better-more': item.isBetter }">
              <span>{{ item.isBetter ? '高' : '低' }}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.shop-info {
  border-bottom: 5px solid #f2f5f8;
}
.shop-top {
  padding: 20px 0 15px 10px;
  font-size: 16px;
}
.shop-top img {
  width: 45px;
  border-radius: 50%;
  border: 1px solid #f2f5f8;
  vertical-align: middle;
  box-shadow: 0 0 5px 2px #f2f5f8;
}
.shop-top .title {
  line-height: 45px;
  height: 45px;
  margin-left: 5px;
  color: #666;
}
.shop-middle {
  display: flex;
}
.clearfix:after,
.clearfix:before {
  content: '';
  display: table;
}
.clearfix:after {
  clear: both;
}
.shop-middle-item {
  flex: 1;
}
.shop-middle-left {
  float: left;
  display: flex;
}
.shop-middle-right {
  float: right;
  margin-left: 20px;
  font-size: 13px;
}
.shop-middle-left > div {
  flex: 1;
  text-align: center;
  padding: 10px;
}
.sells-count,
.goods-count {
  font-size: 14px;
}
.sells-text,
.goods-text {
  margin-top: 5px;
  font-size: 12px;
}
.info-goods {
  border-right: 1px solid #f2f5f8;
}
.score {
  padding: 0 15px;
  color: green;
}
.better {
  background-color: green;
  color: #eee;
}
.score-better {
  color: red;
}
.better-more {
  background-color: red;
}
.shop-bottom {
  margin: 20px auto;
  text-align: center;
  width: 100px;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  font-size: 14px;
  color: #666;
  background-color: #f2f5f8;
  border: 1px solid #f2f5f8;
}
</style>
