import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    orders: [],
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true,
      },
      {
        id: 1,
        value: '代付款',
        isActive: false,
      },
      {
        id: 2,
        value: '代发货',
        isActive: false,
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false,
      },
    ],
  },
  onShow(options) {
    const token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    const { type } = currentPage.options
    this.changeTitleByIndex(type - 1)
    this.getOrders(type)
  },
  // 获取订单列表
  async getOrders(type) {
    const res = await request({ url: '/my/orders/all', data: { type } })
    this.setData({
      orders: res.orders.map((v) => ({
        ...v,
        create_time_cn: new Date(v.create_time * 1000).toLocaleString(),
      })),
    })
  },
  // 根据标题的索引来激活选中的选中标题数组
  changeTitleByIndex(index) {
    let { tabs } = this.data
    tabs.forEach((v, i) => {
      i === index ? (v.isActive = true) : (v.isActive = false)
    })
    this.setData({
      tabs,
    })
  },
  // 切换 tabs
  handleItemChange(e) {
    const { index } = e.detail
    this.changeTitleByIndex(index)
    this.getOrders(index + 1)
  },
})
