<template>
  <Scroll id="Tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in categories"
        :key="index"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </Scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'TabMenu',
  components: {
    Scroll,
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  props: {
    categories: Array,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    },
  },
}
</script>

<style scoped>
#tab-menu {
  background-color: rgb(245, 245, 245);
  height: 100%;
  width: 90px;
  box-sizing: border-box;
}

.menu-list-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  background-color: rgb(245, 245, 245);
}
.menu-list-item.active {
  font-weight: 700;
  color: blueviolet;
  background-color: #fff;
  border-left: 3px solid blue;
}
</style>
