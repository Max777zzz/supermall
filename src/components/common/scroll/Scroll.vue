<template>
  <div class="wrapper" ref="wrapper">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: true,
    })
    // 监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', () => {
      console.log('上拉加载更多')
      setTimeout(() => {
        this.scroll.finishPullUp()
      }, 2000)
    })
  },
  methods: {
    scrollTop(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
  },
}
</script>

<style scoped></style>
