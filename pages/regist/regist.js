// pages/regist/regist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
    password2:''
  },
  phone:function(a){
    this.setData({
      phone:a.detail.value
    })
  },
  password: function (a) {
    this.setData({
      password: a.detail.value
    })
  },
  password2: function (a) {
    this.setData({
      password2: a.detail.value
    })
  },
  regist:function(){
    if(this.data.password!=this.data.password2){
      return wx.showToast({
        title: '两次密码输入不一样',
        icon:'none'
      })
    }
    if(this.data.phone.length!=11){
      return wx.showToast({
        title: '手机号码有误',
        icon: 'none'
      })
    }
    if (this.data.password.length < 6) {
      return wx.showToast({
        title: '密码小于六位数',
        icon: 'none'
      })
    }
    var sendData = {
      userId:this.data.phone,
      passward:this.data.password,
      passwardAgain:this.data.password2
    };
    for(let key in sendData){
      if(sendData[key].value==''){
        return wx.showToast({
          title: '请完善信息',
          icon:'none'
        })
      }
    }
    wx.request({
      url: 'http://47.107.137.51:8002/user/register',
      method:'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data:sendData,
      success:function(res){
        if(res.data.code == 200){
          wx.showToast({
            title: '注册成功',
          })
          setTimeout(function(){
            wx.redirectTo({
              url: '../login/login',
            })
          },1000)
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })
        }
      }
    })
  },
  login:function(){
    wx.redirectTo({
      url: '../login/login',
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