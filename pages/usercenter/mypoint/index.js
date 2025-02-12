// pages/usercenter/mypoint/index.js
import { getUser } from '../../../services/usercenter/user';
import { updateUser } from '../../../services/usercenter/user';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad : true,
    personInfo: {
      avatarUrl: '',
      nickName: '',
      gender: 0,
      phoneNumber: '',
      wx_account:'',
      _id:'',
      points: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
  },

  async init(){
    const userInfo=await getUser();
    console.log(userInfo);
    this.setData({
      personInfo:userInfo
    })
  },

  async addpoint(){
    if(this.data.isLoad){
      this.setData({
        isLoad : false
      })
      const uid = this.data.personInfo._id
      const field = 'points'
      console.log(uid)
      const res = await updateUser({
        uid,
        data:{
            [field]:this.data.personInfo.points + 1
        },
      });
      console.log("up-res",res);
      this.init();
      this.setData({
        isLoad : true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  goBack() {
    wx.navigateBack()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }

})