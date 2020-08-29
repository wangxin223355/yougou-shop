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

/**
 * @description promise 形式 showModal
 * @param {object} content 参数
 */
export const showModal = function ({ content }) {
  return new Promise((reslove, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        reslove(res)
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

/**
 * @description promise 形式 showToast
 * @param {object} title 参数
 */
export const showToast = function ({ title }) {
  return new Promise((reslove, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result) => {
        reslove(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {},
    })
  })
}
