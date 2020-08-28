import regeneratorRuntime from '../../lib/runtime/runtime'
import { getSetting, chooseAddress, openSetting } from '../../utils/ayncWx'

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },
  onLoad: function (options) {},
  onShow: function () {
    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []
    this.setData({
      address,
    })
    this.setCart(cart)
  },
  // 点击收获地址
  async handleChooseAddress() {
    try {
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting['scope.address']
      if (scopeAddress === false) {
        await openSetting()
      }
      const address = await chooseAddress()
      address.all =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error)
    }
  },
  // 商品的选中
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex((v) => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 设置购物车状态 重新计算工具栏数据
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach((v, i) => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    allChecked = cart.length !== 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum,
    })
    wx.setStorageSync('cart', cart)
  },
  // 商品的全选功能
  handleItemAllCheck() {
    let { cart, allChecked } = this.data
    allChecked = !allChecked
    cart.forEach((v) => (v.checked = allChecked))
    this.setData({
      cart,
      allChecked,
    })
    this.setCart(cart)
  },
})
