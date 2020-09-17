export default {
  // 无异步做法

  // addCart(state, payload) {
  // 查找数组中是否存在该数据
  // let oldProduct = null;
  // for (let item of state.cartList) {
  //   if (item.iid === payload.iid) {
  //     oldProduct = item
  //   }
  // }

  // 查找数组中是否存在该数据
  // let product = state.cartList.find(item => item.iid === payload.iid)
  // let product = context.state.cartList.find(item => item.iid === payload.iid)

  // 判断这条数据是否在数组存在 有则+1/无则插入
  // if (product) {
  //   product.count += 1
  // } else {
  //   payload.count = 1
  //   state.cartList.push(payload)
  // }

  // 异步做法
  addCounter(state, payload) {
    payload.count += 1
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}