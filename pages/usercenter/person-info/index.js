import { getUser,updateUser } from '../../../services/usercenter/user';
// import { genSimpleUserInfo,genSimpleUserInfop } from '../../../model/usercenter.js';
import { fetchPerson } from '../../../services/usercenter/fetchPerson';
import { phoneEncryption } from '../../../utils/util';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    personInfo: {
      avatarUrl: '',
      nickName: '',
      gender: 0,
      phoneNumber: '',
      wx_account:'',
      _id:''
    },
    showUnbindConfirm: false,
    pickerOptions: [
      {
        name: '男',
        code: '1',
      },
      {
        name: '女',
        code: '2',
      },
    ],
    typeVisible: false,
    genderMap: ['', '男', '女'],
  },
  onShow() {
    this.init();
  },
  init() {
    this.fetchData();
  },
  async fetchData() {
    const personInfo =  await getUser();
    console.log('ps-in',personInfo);
    console.log('pph',typeof(personInfo.phoneNumber));

    this.setData({
            personInfo,
            'personInfo.phoneNumber': typeof(personInfo.phoneNumber)=='undefined'?"":phoneEncryption(personInfo.phoneNumber),
          });
    // fetchPerson().then((personInfo) => {
    //   this.setData({
    //     personInfo,
    //     'personInfo.phoneNumber': phoneEncryption(personInfo.phoneNumber),
    //   });
    // });
  },
  onClickCell({ currentTarget }) {
    const { dataset } = currentTarget;
    const { nickName,_id, phoneNumber,wx_account} = this.data.personInfo;

    switch (dataset.type) {
      case 'gender':
        this.setData({
          typeVisible: true,
        });
        break;
      case 'name':
        wx.navigateTo({
          url: `/pages/usercenter/name-edit/index?type=0&name=${nickName}&uid=${_id}`,
        });
        break;
      case 'phoneNumber':
            wx.navigateTo({
              url: `/pages/usercenter/name-edit/index?type=1&name=${phoneNumber}&uid=${_id}`,
            });
            break;
       case 'wx':
            wx.navigateTo({
            url: `/pages/usercenter/name-edit/index?type=2&name=${wx_account}&uid=${_id}`,
            });
            break;
    //   case 'avatarUrl':
    //     this.toModifyAvatar();
    //     break;
      default: {
        break;
      }
    }
  },
  onClose() {
    this.setData({
      typeVisible: false,
    });
  },
  async onConfirm(e) {
    wx.showToast({
        title: "保存中",
        icon: 'loading',
        mask: true,
        duration: 5000
    });
    const { value } = e.detail;
    const user = await this.updataUserInfo({gender:value});
    if(user == 1){
        wx.hideToast();
        this.setData(
            {
              typeVisible: false,
              'personInfo.gender': value,
            },
            () => {
              Toast({
                context: this,
                selector: '#t-toast',
                message: '设置成功',
                theme: 'success',
              });
            },
          );
    }else{
        wx.hideToast();
        Toast({
            context: this,
            selector: '#t-toast',
            message: '修改失败',
            theme: 'error'
        });
    }
    
  },
onChooseAvatar(e) {
    wx.showToast({
        title: "保存中",
        icon: 'loading',
        mask: true,
        duration: 20000
    });
    const { avatarUrl } = e.detail 
    const { _id } = this.data.personInfo;
    let file_name = _id +'-'+Date.parse(new Date());
    wx.cloud.uploadFile({
        cloudPath: `avatar/${file_name}.jpg`, // 上传至云端的路径
        filePath: avatarUrl, // 小程序临时文件路径
        success: async res => {
            // 返回文件 ID
            console.log(res.fileID)
            const user = await this.updataUserInfo({avatarUrl:res.fileID});
            console.log("up-res",user);
            if(user == 1){
                wx.hideToast();
                wx.showToast({
                    title: '修改成功',
                    icon: 'success',
                    duration: 800
                  }).then(() => {
                    this.fetchData();
                  });
            }else{
                wx.hideToast();
                wx.showToast({
                    title: '修改失败',
                    icon: 'none',
                    duration: 800
                })
            }
            // this.setData({
            //     personInfo.avatarUrl:res.fileID,
            //   })
            // do something
        },
        fail: console.error
    })
    this.setData({
      avatarUrl,
    })
  },

  async updataUserInfo(data) {  
    const { _id } = this.data.personInfo;
    const res = await updateUser({
        uid:_id,
        data:data,
      });
    
    if(typeof(res.openId)!='undefined'){
       return 1;
    }else{
       return 0;
    }
  },
  async toModifyAvatar() {
    try {
      const tempFilePath = await new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: (res) => {
            const { path, size } = res.tempFiles[0];
            if (size <= 10485760) {
              resolve(path);
            } else {
              reject({ errMsg: '图片大小超出限制，请重新上传' });
            }
          },
          fail: (err) => reject(err),
        });
      });
      const tempUrlArr = tempFilePath.split('/');
      const tempFileName = tempUrlArr[tempUrlArr.length - 1];
      Toast({
        context: this,
        selector: '#t-toast',
        message: `已选择图片-${tempFileName}`,
        theme: 'success',
      });
    } catch (error) {
      if (error.errMsg === 'chooseImage:fail cancel') return;
      Toast({
        context: this,
        selector: '#t-toast',
        message: error.errMsg || error.msg || '修改头像出错了',
        theme: 'error',
      });
    }
  },
  // 获取微信手机号
  getPhoneNumber (e) {
    console.log(e.detail.code)  // 动态令牌
    console.log(e.detail.errMsg) // 回调信息（成功失败都会返回）
    console.log(e.detail.errno)  // 错误码（失败时返回）
    console.log(e);
  }
});
