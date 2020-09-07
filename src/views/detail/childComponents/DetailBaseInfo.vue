<template>
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      defualt() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
  font-size: 14px;
}
.info-price {
  position: relative;
  margin-top: 10px;
}
.info-price .n-price {
  font-size: 18px;
  color: blueviolet;
}
.info-price .o-price {
  font-size: 14px;
  margin: 0 2px 0 5px;
  text-decoration: line-through;
}
.info-price .discount {
  position: absolute;
  top: 2px;
  text-align: center;
  font-size: 12px;
  color: #eee;
  border-radius: 5px;
  background-color: blueviolet;
}
.info-other {
  display: flex;
  font-size: 12px;
  padding: 15px 0 10px;
  justify-content: space-between;
}
.info-other > span {
  flex: 1;
  text-align: center;
}
.info-other > span:first-child {
  text-align: left;
}
.info-other > span:last-child {
  text-align: right;
}
.info-service {
  display: flex;
  font-size: 12px;
  color: #666;
  padding: 15px 0 10px;
}
.info-service-item {
  flex: 1;
  text-align: center;
}
.info-service-item:first-child {
  text-align: left;
}
.info-service-item:last-child {
  text-align: right;
}
.info-service-item img {
  width: 14px;
}
.info-service-item span {
  position: relative;
  top: -3px;
}
</style>
