import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    goods: [],
    // 按钮 取消 是否显示
    isFocus: false,
    // 输入框的值
    inpValue: '',
  },
  // 全局定时器ID
  TimerID: -1,
  // 输入框的值改变就会触发的事件
  handleInput(e) {
    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: true,
      })
      return
    }
    // 防抖
    this.setData({
      isFocus: true,
    })
    clearTimeout(this.TimerID)
    this.TimerID = setTimeout(() => {
      this.qserch(value)
    }, 1000)
  },
  // 发送请求获取请求搜索的数据
  async qserch(query) {
    const res = await request({ url: '/goods/search', data: { query } })
    this.setData({
      goods: res.goods,
    })
  },
  // 点击 取消按钮
  handleCancel() {
    this.setData({
      inpValue: '',
      isFocus: false,
      goods: [],
    })
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
})
