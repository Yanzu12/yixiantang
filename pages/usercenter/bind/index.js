// pages/usercenter/bind/index.js
import { updateUser } from '../../../services/usercenter/user';
import { getUser } from '../../../services/usercenter/user';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    nameValue:''
  },

  saveinviter(e){
    this.setData({
      nameValue: e.detail.value
    })
    //console.log(this.data.nameValue)
  },

  async onSubmit() {
    wx.showToast({
        title: "保存中",
        icon: 'loading',
        mask: true,
        duration: 20000
    });
    const uid=this.data.id
    const name=this.data.nameValue
    //console.log(uid)
        const res = await updateUser({
        uid,
        data:{
            inviter: name
        },
      });
    console.log("up-res",res);
    wx.hideToast();
    if(typeof(res.openId)!='undefined'){
        wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500
          }).then(() => {
            wx.navigateBack({ backRefresh: true });
          });
    }else{
        wx.showToast({
            title: '修改失败',
            icon: 'none',
            duration: 1500
          })
    }
    
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init()
  },

  async init(){
    const user = await getUser()
    this.setData({
      id:user._id
    })
    //console.log(this.data.id)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})