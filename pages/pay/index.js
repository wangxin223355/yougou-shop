import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index'
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment,
} from '../../utils/ayncWx'

Page({
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },
  onLoad: function (options) {},
  onShow: function () {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter((v) => v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach((v, i) => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    })
  },
  // 点击 支付
  async handleOrederPay() {
    try {
      const { token } = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
          success: (result) => {},
          fail: () => {},
          complete: () => {},
        })
        return
      }
      const header = { Authorization: token }
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      let goods = []
      cart.forEach((v) =>
        goods.push({
          goods: v.goods_id,
          goods_number: v.goods_number,
          goods_price: v.goods_price,
        })
      )
      const orderParams = { order_price, consignee_addr, goods }
      // 发送请求 创建订单 获取订单编号
      const { order_number } = await request({
        url: '/my/orders/create',
        method: 'POST',
        data: orderParams,
      })
      // 预支付
      const { pay } = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        data: { order_number },
      })
      // 发起微信支付
      await requestPayment(pay)
      // 查询后台
      const res = await request({
        url: '/my/orders/chkOrder',
        method: 'POST',
        data: { order_number },
      })
      await showToast({ title: '支付成功' })
      // 手动删除缓存中已经支付的商品
      let newCart = wx.getStorageSync('cart')
      newCart = newCart.filter((v) => !v.checked)
      wx.getStorageSync('cart', cart)
      wx.navigateTo({
        url: '/pages/order/index',
      })
    } catch (error) {
      await showToast({ title: '支付失败' })
    }
  },
})
