<template>
  <div class="bottom-bar">
    <div class="check-view">
      <check-button
        class="check-button"
        :is-checked="isAllChecked"
        @click.native="allCheckClick"
      />
      <span>全选</span>
    </div>

    <div class="price">
      合计： <span class="price-num">{{ totalPrice }}</span>
    </div>

    <div class="calculate" @click="clacClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'cartBottomBar',
  components: {
    CheckButton,
  },
  methods: {
    ...mapActions(['textCart']),
    allCheckClick() {
      if (this.isAllChecked) {
        //isAllChecked = true 全部选中
        this.cartList.map((item) => (item.checked = false))
      } else {
        //isAllChecked = false 部分选中 或 全部不选中
        this.cartList.map((item) => (item.checked = true))
      }
    },
    clacClick() {
      this.textCart(this.cartList).then((res) => {
        this.$toast.show(res, 2000)
      })
    },
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '￥' +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length
    },
    isAllChecked() {
      if (this.cartList.length === 0) return false
      return this.cartList.every((item) => item.checked)
    },
  },
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  background-color: #eee;
  position: relative;
  height: 40px;
  line-height: 40px;
  width: 100%;
  font-size: 12px;
}
.bottom-bar > div {
  flex: 1;
}
.check-view {
  display: flex;
  align-items: center;

  margin-left: 10px;
}
.check-button {
  width: 16px;
  height: 16px;
  line-height: 20px;
  margin-right: 5px;
}
.bottom-bar .price {
  flex: 2;
  margin-left: 10px;
}
.price-num {
  color: orange;
}
.bottom-bar .calculate {
  flex: 2;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: blueviolet;
  color: white;
}
</style>
