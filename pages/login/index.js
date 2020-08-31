// pages/login/index.js
//Page Object
Page({
  data: {},
  //options(Object)
  handleGetUserInfo(e) {
    const { userInfo } = e.detail
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })
  },
})
