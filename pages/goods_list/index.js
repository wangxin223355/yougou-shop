import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true,
      },
      {
        id: 1,
        value: '销量',
        isActive: false,
      },
      {
        id: 2,
        value: '价格',
        isActive: false,
      },
    ],
    goodsList: [],
  },
  // 接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  totalPages: 1,
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query || ''
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams,
    })
    this.totalPages = Math.ceil(res.total / this.QueryParams.pagesize)
    this.setData({
      goodsList: [...this.data.goodsList, ...res.goods],
    })
    wx.stopPullDownRefresh()
  },
  // 修改当前 tabs 触发项
  handleItemChange(e) {
    // console.log(e.detail)
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => {
      i === index ? (v.isActive = true) : (v.isActive = false)
    })
    this.setData({
      tabs,
    })
    if (index !== 0) {
      this.setData({
        goodsList: [],
      })
      this.getGoodsList()
    }
  },
  // 滚动条触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据',
      })
    } else {
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    this.setData({
      goodsList: [],
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  },
})
