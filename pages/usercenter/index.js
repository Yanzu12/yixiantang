import { fetchUserCenter } from '../../services/usercenter/fetchUsercenter';
import { getToPayOrderCount, getToSendOrderCount, getToReceiveOrderCount } from '../../services/order/order';
import { ORDER_STATUS } from '../../services/order/order';
import Toast from 'tdesign-miniprogram/toast/index';
import { getUser } from '../../services/usercenter/user';
import { getCloudImageTempUrl } from '../../utils/cloudImageHandler';


const menuData = [
  [
    {
      title: '收货地址',
      tit: '',
      url: '',
      type: 'address',
    },
    
    {
      title: '我的积分',
      tit: '',
      url: '',
      type: 'point',
    },
    
    {
      title: '帮助中心',
      tit: '',
      url: '',
      type: 'help-center',
    },

    {
      title: '联系客服',
      tit: '',
      url: '',
      type: 'service',
    }
  ],
];

const orderTagInfos = [
  {
    title: '待付款',
    iconName: 'wallet',
    orderNum: 0,
    tabType: ORDER_STATUS.TO_PAY,
    status: 1,
  },
  {
    title: '待发货',
    iconName: 'deliver',
    orderNum: 0,
    tabType: ORDER_STATUS.TO_SEND,
    status: 1,
  },
  {
    title: '待收货',
    iconName: 'package',
    orderNum: 0,
    tabType: ORDER_STATUS.TO_RECEIVE,
    status: 1,
  },
  {
    title: '待评价',
    iconName: 'comment',
    orderNum: 0,
    tabType: ORDER_STATUS.FINISHED,
    status: 1,
  },
  // {
  //   title: '退款/售后',
  //   iconName: 'exchang',
  //   orderNum: 0,
  //   tabType: 0,
  //   status: 1,
  // },
];

const getDefaultData = () => ({
  showMakePhone: false,
  userInfo: {
    avatarUrl: '',
    nickName: '正在登录...',
    phoneNumber: '',
    _id:'',
    points: 0,
    inviter:''
  },
  menuData,
  orderTagInfos,
  customerServiceInfo: {},
  currAuthStep: 1,
  showKefu: true,
  versionNo: '',
  toPayOrderCount: 0,
  toSendOrderCount: 0,
  toReceiveOrderCount: 0,
});

Page({
  data: getDefaultData(),

  onLoad() {
    this.getVersionInfo();
  },

  onShow() {
    this.getTabBar().init();
    this.init();
  },
  onPullDownRefresh() {
    this.init();
  },

  init() {
    this.fetUseriInfoHandle();
    this.initOrderCount();
  },
  
  async initOrderCount() {
    const userInfo = await getUser();
    console.log('re',userInfo);
    if(typeof(userInfo.nickName)=='undefined' ) return;

    userInfo.avatarUrl = getCloudImageTempUrl([userInfo.avatarUrl])[0]
    this.setData({
        userInfo
    })
    const {_id} = userInfo;
    console.log('_id',_id);
    const [pay, send, receive] = await Promise.all([
      getToPayOrderCount(_id),
      getToSendOrderCount(_id),
      getToReceiveOrderCount(_id),
    ]);
    console.log('pay',pay);
    this.setData({
      'orderTagInfos[0].orderNum': pay,
      'orderTagInfos[1].orderNum': send,
      'orderTagInfos[2].orderNum': receive,
    });
    //fetchUserInfoHandle()
    fetchUserCenter().then(({ upserInfo, countsData, customerServiceInfo }) => {
      // eslint-disable-next-line no-unused-expressions
      //console.log('用户信息',userInfo)
      menuData?.[0].forEach((v) => {
        countsData && countsData.forEach((counts) => {
          if (counts.type === v.type) {
            // eslint-disable-next-line no-param-reassign
            v.tit = counts.num;
          }
          if (v.type === 'point'){
            v.tit = userInfo.points;
            console.log('用户积分',v.tit)
          }
        });
      });
    
      this.setData({
        menuData,
        customerServiceInfo,
        currAuthStep: 2,
      });
    //   this.initUser();
      wx.stopPullDownRefresh();
    });
  },
  fetUseriInfoHandle() {
    
  },

  onClickCell({ currentTarget }) {
    const { type } = currentTarget.dataset;

    switch (type) {
      case 'address': {
        wx.navigateTo({ url: '/pages/usercenter/address/list/index' });
        break;
      }
      case 'service': {
        this.openMakePhone();
        break;
      }
      case 'help-center': {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '你点击了帮助中心',
          icon: '',
          duration: 1000,
        });
        break;
      }
      case 'point': {
        // Toast({
        //   context: this,
        //   selector: '#t-toast',
        //   message: '你点击了积分菜单',
        //   icon: '',
        //   duration: 1000,
        // });
        // break;
        //console.log(this.data.userInfo)
        if(this.data.userInfo.inviter === 'uninvited'){//判断是否绑定上级
          wx.navigateTo({ url: '/pages/usercenter/bind/index'});//绑定
          break;
        }else{
          wx.navigateTo({ url: '/pages/usercenter/mypoint/index'});//积分
        break;
        }
        
      }
      case 'coupon': {
        wx.navigateTo({ url: '/pages/coupon/coupon-list/index' });
        break;
      }
      default: {
        Toast({
          context: this,
          selector: '#t-toast',
          message: '未知跳转',
          icon: '',
          duration: 1000,
        });
        break;
      }
    }
  },

  jumpNav(e) {
    const status = e.detail.tabType;

    if (status === 0) {
      wx.navigateTo({ url: '/pages/order/after-service-list/index' });
    } else {
      wx.navigateTo({ url: `/pages/order/order-list/index?status=${status}` });
    }
  },

  jumpAllOrder() {
    wx.navigateTo({ url: '/pages/order/order-list/index' });
  },

  openMakePhone() {
    this.setData({ showMakePhone: true });
  },

  closeMakePhone() {
    this.setData({ showMakePhone: false });
  },

  call() {
    wx.makePhoneCall({
      phoneNumber: this.data.customerServiceInfo.servicePhone,
    });
  },

  gotoUserEditPage() {
    const { currAuthStep } = this.data;
    if (currAuthStep === 2) {
      wx.navigateTo({ url: '/pages/usercenter/person-info/index' });
    } else {
      this.fetUseriInfoHandle();
    }
  },

  getVersionInfo() {
    const versionInfo = wx.getAccountInfoSync();
    const { version, envVersion = __wxConfig } = versionInfo.miniProgram;
    this.setData({
      versionNo: envVersion === 'release' ? version : envVersion,
    });
  },
});
