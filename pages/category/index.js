// pages/category/index.js
import { request } from '../../request/index'
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
  },
  // 接口的返回数据
  Cates: [],
  onLoad: function (options) {
    this.getCates()
  },
  // 获取分类数据
  getCates() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
    }).then((res) => {
      this.Cates = res.data.message
      let leftMenuList = this.Cates.map((v) => v.cat_name)
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent,
      })
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    const index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
    })
  },
})
