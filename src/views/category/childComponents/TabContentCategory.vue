<template>
  <div>
    <div v-if="subcategories.list">
      <div
        class="item"
        v-for="(item, index) in subcategories.list"
        :key="index"
      >
        <a :href="item.link">
          <img class="item-img" :src="item.image" alt="" />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabContentCategory',
  props: {
    subcategories: {
      type: Object,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
.panel img {
  width: 100%;
}

.item {
  text-align: center;
  font-size: 12px;
}

.item-img {
  width: 80%;
}

.item-text {
  margin-top: 15px;
}
</style>
