<template>
  <div class="cart-list">
    <scroll class="content" ref="Scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import cartListItem from './cartListItem'
import { mapGetters } from 'vuex'
export default {
  name: 'cartList',
  components: {
    Scroll,
    cartListItem,
  },
  computed: {
    ...mapGetters(['cartList']),
  },
  activated() {
    this.$refs.Scroll.refresh()
  },
}
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 49px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
