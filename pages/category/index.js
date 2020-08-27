// pages/category/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 商品数据
    rightContent: [],
    // 被点击的左侧菜单索引
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部距离
    scrollTop: 0,
  },
  // 接口的返回数据
  Cates: [],
  onLoad: function (options) {
    // this.getCates()
    // 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      this.getCates()
    } else {
      // 暂时定义一个过期时间10s - 5min
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates()
      } else {
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map((v) => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent,
        })
      }
    }
  },
  // 获取分类数据
  async getCates() {
    // request({
    //   url: '/categories',
    // }).then((res) => {
    //   this.Cates = res.data.message
    //   wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    //   let leftMenuList = this.Cates.map((v) => v.cat_name)
    //   let rightContent = this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightContent,
    //   })
    // })
    const res = await request({
      url: '/categories',
    })
    this.Cates = res
    wx.setStorageSync('cates', { time: Date.now(), data: this.Cates })
    let leftMenuList = this.Cates.map((v) => v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent,
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    const index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    })
  },
})
