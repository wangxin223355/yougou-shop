//Page Object
Page({
  data: {
    collect: [],
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true,
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false,
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false,
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false,
      },
    ],
  },
  // 切换 tabs
  handleItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => {
      i === index ? (v.isActive = true) : (v.isActive = false)
    })
    this.setData({
      tabs,
    })
  },
  onShow: function () {
    const collect = wx.getStorageSync('collect') || []
    this.setData({
      collect,
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
})
