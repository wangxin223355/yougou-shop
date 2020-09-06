Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true,
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false,
      },
    ],
    // 被选中的图片路径数组
    chooseImgs: [],
    // 文本域的内容
    textVal: '',
  },
  // 外网图片的路径数组
  UploadImgs: [],
  // 修改当前 tabs 触发项
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
  // 点击 + 选择图片事件
  handldeChooseImg() {
    wx.chooseImage({
      // 同时选中的图片
      count: 9,
      // 图片的格式 原图 压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源 相册 照相机
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          // 图片数组进行拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths],
        })
      },
      fail: () => {},
      complete: () => {},
    })
  },
  // 点击删除自定义图片组件
  handleRemoveImg(e) {
    const { index } = e.currentTarget.dataset
    let { chooseImgs } = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs,
    })
  },
  // 文本域 输入事件
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value,
    })
  },
  // 提交按钮 点击事件
  handleFormSubmit() {
    const { textVal, chooseImgs } = this.data
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      })
      return
    }
    // 上传图片到服务器
    // 不支持多个文件同时上传 遍历数组挨个上传
    wx.showLoading({
      title: '正在上传中',
      mask: true,
    })
    if (chooseImgs.length !== 0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction/',
          filePath: v,
          name: 'file',
          // 顺带的文本信息
          formData: {},
          success: (result) => {
            // let url = JSON.parse(result.data)
            let url = '我是路径'
            this.UploadImgs.push(url)

            // 图片全部上传完再进行提交
            if (i === chooseImgs.length - 1) {
              wx.hideLoading()
              console.log('提交到后台中')
              this.setData({
                textVal: '',
                chooseImgs: [],
              })
            }
            // 返回上一页面
            wx.navigateBack({
              delta: 1,
            })
          },
        })
      })
    } else {
      wx.hideLoading()
      console.log('只是提交了文本')
      wx.navigateBack({
        delta: 1,
      })
    }
  },
})
