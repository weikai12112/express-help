// pages/send/send.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    exproessageAddress: '',
    address: '',
    information: '',
    comment: ''
  },
  exproessageAddress:function(a){
    this.data.exproessageAddress = a.detail.value
  },
  address: function (a) {
    this.data.address = a.detail.value
  },
  information: function (a) {
    this.data.information = a.detail.value
  },
  comment: function (a) {
    this.data.comment = a.detail.value
  },
  sendOrder:function(){
    var that = this
    if(this.data.comment == ''){
      this.data.comment = '无'
    }
    var orderData = {
      userId: this.data.userId,
      exproessageAddress: this.data.exproessageAddress,
      address: this.data.address,
      information: this.data.information,
      comment: this.data.comment
    }
    console.log(typeof (orderData.userId))
    for(let key in orderData){
      if(orderData[key] == ''){
        return wx.showToast({
          title: '请完善信息',
          icon:'none'
        })
      }
    }
    wx.request({
      url: 'http://47.107.137.51:8002/indent/publishIndent',
      method: 'POST',
      data: orderData,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '发布成功',
          })
          that.setData({
            exproessageAddress:'',
            address:'',
            information:'',
            comment:''
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../index/index',
              success:function(){
                let pages = getCurrentPages()
                let prePage = pages[0]
                console.log(prePage)
                prePage.onLoad()
              }
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(wx.getStorageSync('user') != ''){
      this.data.userId = wx.getStorageSync('user')
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../login/login',
        })
      }, 1500)
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})