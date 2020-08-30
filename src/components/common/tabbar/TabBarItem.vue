<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :style="activeStyle" @click="isActive = !isActive">
      <slot name="item-icon"></slot>
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'blueviolet',
    },
  },
  data() {
    return {}
  },
  computed: {
    isActive: {
      get() {
        // 当前活跃的组件
        return this.$route.path.indexOf(this.path) !== -1
      },
      set() {},
    },
    activeStyle: function() {
      return this.isActive ? { color: this.activeColor } : {}
    },
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    },
  },
}
</script>

<style>
@import '../../../assets/img/iconfont/iconfont.css';
.tab-bar-item {
  flex-grow: 1;
  height: 49px;
  font-size: 12px;
  text-align: center;
}

.tab-bar-item span {
  display: block;
  font-size: 20px;
  margin-top: 5px;
}
</style>
