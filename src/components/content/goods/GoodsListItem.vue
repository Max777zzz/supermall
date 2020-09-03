<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad" />
    <p class="titles">{{ goodsItem.title }}</p>
    <span class="price">￥{{ goodsItem.price }}</span>
    <span class="cfav">收藏：{{ goodsItem.cfav }}</span>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
  },
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 20px;
  font-size: 10px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.price {
  float: left;
  color: hotpink;
}
.cfav {
  float: right;
  color: orangered;
}
</style>
