<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="showImage" alt="" @load="imageLoad" />
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
      this.$bus.$emit('itemImgLoad')
    },
    goodsItemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img
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
.titles {
  word-break: keep-all;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
