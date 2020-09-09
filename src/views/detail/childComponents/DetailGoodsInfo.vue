<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clearfix">
      <div class="start">+------------</div>
      <br />
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end">------------+</div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      counter: 0,
      imgesLength: 0,
    }
  },
  methods: {
    imgLoad() {
      // 判断，所有的图片都加载完了，那么进行一次回调就可以了
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    },
  },
  watch: {
    // 获取图片的个数
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    },
  },
}
</script>

<style scoped>
.clearfix:after,
.clearfix:before {
  content: '';
  display: table;
}
.clearfix:after {
  clear: both;
}
.goods-info {
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  border-bottom: 5px solid #f2f5f8;
}
.start {
  float: left;
}
.desc {
  font-size: 14px;
  color: #666;
  padding: 10px;
}
.end {
  float: right;
}
.info-key {
  font-weight: 700;
  padding: 10px 0 10px 5px;
}
.info-list {
  width: 100%;
}
.info-list img {
  width: 100%;
}
</style>
