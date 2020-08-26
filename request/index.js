export const request = function (prams) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...prams,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
