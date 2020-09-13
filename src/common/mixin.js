import {
  debounce
} from 'common/utils.js'
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.Scroll.refresh, 500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    console.log("123456");
  }
}