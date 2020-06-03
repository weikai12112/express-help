// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },
  phone:function(a){
    this.data.phone = a.detail.value
  },
  password:function(a){
    this.data.password = a.detail.value
  },
  login:function(){
    var loginData = {
      userId:this.data.phone,
      passward:this.data.password
    }
    for(let key in loginData){
      if(loginData[key].value == ''){
        return wx.showToast({
          title: '账号/密码不能为空',
          icon:'none'
        })
      }
    }
    wx.request({
      url: 'http://47.107.137.51:8002/user/login',
      method:'GET',
      data:loginData,
      success:function(res){
        console.log(res)
        if(res.data.code == 200){
          wx.showToast({
            title: '登录成功',
          })
          wx.setStorageSync('user', res.data.data)
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
            },1000)
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }

      }
    })
  },
  regist:function(){
    wx.redirectTo({
      url: '../regist/regist',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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