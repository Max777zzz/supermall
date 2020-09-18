export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let product = context.state.cartList.find(item => item.iid === payload.iid)

      if (product) {
        // product.count += 1
        context.commit('addCounter', product)
        resolve('商品数量 +1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('新产品加入购物车')
      }
    })
  }
}