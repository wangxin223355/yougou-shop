/**
 * @des promise 形式 getSetting
 */
export const getSetting = function () {
  return new Promise((reslove, reject) => {
    wx.getSetting({
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
export const chooseAddress = function () {
  return new Promise((reslove, reject) => {
    wx.chooseAddress({
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
export const openSetting = function () {
  return new Promise((reslove, reject) => {
    wx.openSetting({
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}
