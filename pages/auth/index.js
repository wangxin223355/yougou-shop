// pages/auth/index.js
import { request } from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/runtime'
import { login, showToast } from '../../utils/ayncWx'

Page({
  data: {
    defaultToken:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo',
  },
  onLoad: function (options) {},
  onReady: function () {},
  // 获取用户信息
  async handleGetUserInfo(e) {
    try {
      const { encryptedData, rawData, iv, signature } = e.detail
      const { code } = await login()
      const loginParams = { encryptedData, rawData, iv, signature, code }
      const { token } =
        (await request({
          url: '/users/wxlogin',
          data: loginParams,
          method: 'post',
        })) || []
      // 默认 token 貌似服务器无法生存新token
      wx.setStorageSync('token', this.data.defaultToken)
      wx.navigateBack({
        delta: 1,
      })
    } catch (error) {
      console.log(error)
    }
  },
})
