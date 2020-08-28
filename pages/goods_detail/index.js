import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goodsObj: {},
  },
  // 商品对象
  GoodsInfo: {},
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品的详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: '/goods/detail', data: { goods_id } })
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      },
    })
  },
  // 点击轮播图 放大预览
  handlePrevewImage(e) {
    const urls = this.GoodsInfo.pics.map((v) => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current: current,
      urls: urls,
    })
  },
  // 加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex((v) => {
      return v.goods_id === this.GoodsInfo.goods_id
    })
    if (index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true
      cart.push(this.GoodsInfo)
    } else {
      cart[index].num++
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    })
  },
})
