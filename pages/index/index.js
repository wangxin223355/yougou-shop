//Page Object
import { request } from '../../request/index'
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: [],
  },
  onLoad: function (options) {
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    }).then((res) => {
      this.setData({
        swiperList: res.data.message,
      })
    })
  },
  // 获取导航数据
  getCatesList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    }).then((res) => {
      this.setData({
        catesList: res.data.message,
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
    }).then((res) => {
      this.setData({
        floorList: res.data.message,
      })
    })
  },
})
