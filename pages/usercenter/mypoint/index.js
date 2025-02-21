// pages/usercenter/mypoint/index.js
import { getUser } from '../../../services/usercenter/user';
import { updateUser } from '../../../services/usercenter/user';

import { getPointHistory } from '../../../services/point/LoadPointHistory';


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
      points: 0,
    },
    total: 0,
    point_history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
  },

   TimeTransfer(stamp) {
    const date = new Date(stamp); // 根据时间戳创建Date对象
const year = date.getFullYear(); // 获取年份
const month = date.getMonth() + 1; // 获取月份，需要加1
const day = date.getDate(); // 获取日期
const hour = date.getHours(); // 获取小时
const minute = date.getMinutes(); // 获取分钟
const second = date.getSeconds(); // 获取秒数

return `${year}-${month}-${day} ${hour}:${minute}:${second}`; // 拼接成格式化后的日期字符串

 },

  async init(){
    wx.showToast({
      title: '加载中',
      duration: 5000,
      icon: 'loading'
    })
    const userInfo=await getUser();
    console.log(userInfo);
    this.setData({
      personInfo:userInfo
    })
    let res =await getPointHistory(userInfo._id);
    res.records.forEach((history) =>{
        history.createdAt = this.TimeTransfer(history.createdAt);
      }),
    //console.log('res',res)
    this.setData({
      point_history:res.records,
      total:res.total
    })
    wx.hideToast();
  },

  // async addpoint(){
  //   if(this.data.isLoad){
  //     this.setData({
  //       isLoad : false
  //     })
  //     const uid = this.data.personInfo._id
  //     const field = 'points'
  //     console.log(uid)
  //     const res = await updateUser({
  //       uid,
  //       data:{
  //           [field]:this.data.personInfo.points + 1
  //       },
  //     });
  //     console.log("up-res",res);
  //     this.init();
  //     this.setData({
  //       isLoad : true
  //     })
  //   }
  // },

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