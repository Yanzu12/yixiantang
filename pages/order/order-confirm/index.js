import Toast from 'tdesign-miniprogram/toast/index';
import { createOrderItem } from '../../../services/order/orderItem';
import { createOrder, ORDER_STATUS, updateOrderStatus } from '../../../services/order/order';
import { getCartItem, deleteCartItem } from '../../../services/cart/cart';
import { getSkuDetail, updateSku } from '../../../services/sku/sku';
import { getAddressPromise } from '../../usercenter/address/list/util';
import { getSingleCloudImageTempUrl } from '../../../utils/cloudImageHandler';
import { cartShouldFresh } from '../../../utils/cartFresh';
import { pay } from '../../../services/pay/pay';
import { getUser } from '../../../services/usercenter/user';
import { updateUser } from '../../../services/usercenter/user';
import { setPointHistory } from '../../../services/point/createPointHistory'
//import { getElement } from 'XrFrame/core/Element';

const stripeImg = `https://cdn-we-retail.ym.tencent.com/miniapp/order/stripe.png`;

async function createOrderItemFromSku({ count, orderId, skuId }) {
  const latestSku = await getSkuDetail(skuId);
  const finalCount = latestSku.count - count;
  const pay_price =  latestSku.price;
  const attr_values = latestSku.attr_value.reduce((acc, current, index) => {
    return acc + current.value + (index === latestSku.attr_value.length - 1? '' : ', ');
  }, '');
  const desc = latestSku.spu.name + ','+ attr_values;
  console.log('desc',desc);
  // check if sku is enough
  if (finalCount < 0) {
    return Promise.reject({ reason: 'SKU_NOT_ENOUGH' });
  }

  try {
    // decrease sku's count
    await updateSku({
      skuId,
      data: {
        count: finalCount,
      },
    });
    try {
      // create order item需要记录item当时的价格
      await createOrderItem({ desc,count, orderId, skuId,pay_price });
    } catch (e) {
      console.error(e);
      return Promise.reject({ reason: 'CREATE_ORDER_ITEM_FAILED' });
    }
  } catch (e) {
    console.error(e);
    return Promise.reject({ reason: 'SKU_DECREASE_FAILED' });
  }
}

/**
 *
 * @param {Object} cartItem
 * @param {String} orderId
 */
// function createOrderItemFromCartItem(cartItem, orderId) {
//   return createOrderItemFromSku({ count: cartItem.count, orderId, skuId: cartItem.sku._id });
// }

/**
 *
 * @param {Array} cartItems
 */
function cartItemToGoodList(cartItems) {
  return cartItems.map((item) => ({
    thumb: item.sku.image,
    title: item.sku.spu.name,
    specs: item.sku.attr_value.map((v) => v.value).join('，'),
    price: item.sku.price,
    num: item.count,
  }));
}

Page({
  data: {
    placeholder: '备注信息',
    stripeImg,
    loading: true,
    orderCardList: [], // 仅用于商品卡片展示
    goodsRequestList: [],
    userAddressReq: null,
    storeInfoList: [],
    promotionGoodsList: [], //当前门店商品列表(优惠券)
    currentStoreId: null, //当前优惠券storeId
    userAddress: null,
    goodsList: [],
    cartItems: [],
    totalSalePrice: 0,
    directSku: null,
    points:0,
    usepoints:0,
    value:0,
    currprice:0
  },

  payLock: false,

  usepoints(e){
    this.setData({
      usepoints: parseInt(e.detail.value)
    })
    if(isNaN(this.data.usepoints)){
      console.log(this.data.usepoints)
      this.setData({
        usepoints: 0
      })
    }
    console.log(this.data.usepoints)
    const max = Math.floor(this.data.points>this.data.totalSalePrice*100-1?this.data.totalSalePrice*100-1:this.data.points)
    if(this.data.usepoints > this.data.points){
      wx.showToast({
        title: '余额不足',
        icon: 'error',
        duration: 1000
      })
      this.setData({
        usepoints: max,
        value: max,
        currprice: this.data.totalSalePrice - max*0.01
      })
      //console.log(this.data.usepoints)
    }else if(this.data.usepoints > max){
      wx.showToast({
        title: '最低0.01元',
        icon: 'error',
        duration: 1000
      })
      this.setData({
        usepoints: max,
        value: max,
        currprice: this.data.totalSalePrice - max*0.01
      })
      //console.log(this.data.usepoints)
    }else{
      this.setData({
        currprice: this.data.totalSalePrice - this.data.usepoints*0.01
      })
    }
  },

  type: null,
  onShow() {
    this.initUser();
  },
  async initUser(){
    const {_id,points} = await getUser();  
    console.log('u',_id,points);
    this.setData({
      uid:_id,
      points:points
    })
},

  async onLoadFromCart(cartIds) {
    if (typeof cartIds !== 'string') {
      console.error('invalid cart item ids', cartIds);
      this.failedAndBack('获取购物车信息失败');
      return;
    }
    const ids = cartIds.split(',');
    try {
      const cartItems = await Promise.all(
        ids.map(async (id) => {
          const cartItem = (await getCartItem({ id })).data;
          cartItem.sku = { ...cartItem.sku, ...(await getSkuDetail(cartItem.sku._id)) };
          cartItem.sku.image = await getSingleCloudImageTempUrl(cartItem.sku.image);
          return cartItem;
        }),
      );
      const goodsList = cartItemToGoodList(cartItems);
      const totalSalePrice = goodsList.reduce((acc, cur) => acc + cur.price * cur.num, 0);
      const currprice = totalSalePrice
      
      this.setData({
        goodsList,
        totalSalePrice,
        currprice,
        cartItems,
      });
    } catch (e) {
      this.failedAndBack('获取购物车信息失败', e);
    }
  },
  async onLoadFromDirect(countStr, skuId) {
    const count = parseInt(countStr);
    if (typeof count !== 'number' || isNaN(count) || typeof skuId !== 'string') {
      console.error('invalid cunt or skiId', count, skuId);
      this.failedAndBack('初始化信息有误');
      return;
    }

    try {
      const sku = await getSkuDetail(skuId);
      sku.image = await getSingleCloudImageTempUrl(sku.image);

      const goodsList = [
        {
          thumb: sku.image,
          title: sku.spu.name,
          specs: sku.attr_value.map((v) => v.value).join('，'),
          price: sku.price,
          num: count,
        },
      ];

      const totalSalePrice = goodsList.reduce((acc, cur) => acc + cur.price * cur.num, 0);
      const currprice = totalSalePrice
      this.setData({
        goodsList,
        totalSalePrice,
        currprice,
        directSku: sku,
      });
    } catch (e) {
      this.failedAndBack('获取商品信息失败', e);
    }
  },

  async onLoad(options) {
    this.type = options?.type;
    if (this.type === 'cart') {
      await this.onLoadFromCart(options?.cartIds);
    } else if (this.type === 'direct') {
      await this.onLoadFromDirect(options?.count, options?.skuId);
    } else {
      this.failedAndBack('初始化信息有误', 'invalid type');
    }

    this.setData({
      loading: false,
    });
  },

  init() {
    this.setData({
      loading: false,
    });
    const { goodsRequestList } = this;
    this.handleOptionsParams({ goodsRequestList });
  },

  toast(message) {
    Toast({
      context: this,
      selector: '#t-toast',
      message,
      duration: 1000,
      icon: '',
    });
  },

  onGotoAddress() {
    /** 获取一个Promise */
    getAddressPromise()
      .then((address) => {
        this.setData({
          userAddress: {
            ...address,
            detailAddress: address.location + address.address,
          },
        });
      })
      .catch(() => {});

    wx.navigateTo({
      url: `/pages/usercenter/address/list/index?selectMode=true`,
    });
  },
  onTap() {
    this.setData({
      placeholder: '',
    });
  },

  async payImpl( orderId ) {
    try {
      await pay({ id: orderId});
      try {
        await updateOrderStatus({ orderId, status: ORDER_STATUS.TO_SEND });
        this.toast('支付成功');
      } catch (e) {
        console.error(e);
        this.toast('支付成功，但订单状态更新失败');
      } finally {
        setTimeout(() => {
          wx.navigateBack();
        }, 1000);
      }
    } catch (e) {
      this.failedAndBack('支付失败', e);
    }
  },

  async submitOrderFromCart() {
    /**
     * 1.创建订单
     * 2.创建订单项
     * 3.删除购物车项
     */
    wx.showLoading({ title: '订单处理中' });

    const { cartItems, userAddress,uid } = this.data;
    const { id: orderId } = await createOrder({ status: ORDER_STATUS.TO_PAY, addressId: userAddress._id,uid, usepoints:this.data.usepoints});
    const points_left = this.data.points - this.data.usepoints;
    if(this.data.usepoints != 0){
      const res = await updateUser({
      uid,
      data:{
          points: points_left
      },
    });
    console.log('1-c-order');
    setPointHistory(uid,0-this.data.usepoints);
    }
    
    try {
      // await cartItems.map(async (cartItem) => {
      //   const up_order = await createOrderItemFromCartItem(cartItem, orderId);
      // });
      const promiseArray = cartItems.map((cartItem) => {
        return createOrderItemFromSku({ count: cartItem.count, orderId, skuId: cartItem.sku._id });
      });
    
      Promise.all(promiseArray)
       .then((up_orders) => {
            console.log('所有订单商品项创建完成，结果如下：', up_orders);
            // 在这里可以继续进行后续操作，比如计算总价和支付等
            // const totalPrice = goods.price * goods.num - this.data.usepoints * 0.01;
            // console.log('3-price', totalPrice);
            return this.payImpl(orderId);
            wx.hideLoading();

        })
       .catch((error) => {
            console.error('创建订单商品项过程中出现错误：', error);
      });

      // 删除购物车
      try {
        await cartItems.map(async (cartItem) => {
          await deleteCartItem({ cartItemId: cartItem._id });
          // any deletion should notify cart to fresh
          cartShouldFresh();
        });
      } catch (e) {
        console.error(e);
        this.toast('删除购物车失败，请手动删除');
        // do not return, continue to pay
      }
    } catch (e) {
      this.failedAndBack('创建订单失败', e);
    }
  },

  async submitOrderFromDirect() {
    /**
     * 1.创建订单
     * 2.创建订单项
     */
    wx.showLoading({ title: '订单处理中' });

    const { directSku, userAddress, goodsList,uid } = this.data;
    const goods = goodsList[0];
    const { id: orderId } = await createOrder({ status: ORDER_STATUS.TO_PAY, addressId: userAddress._id,uid ,usepoints: this.data.usepoints});
    const points_left = this.data.points - this.data.usepoints;
    if(this.data.usepoints != 0){
      const res = await updateUser({
      uid,
      data:{
          points: points_left
      },
    });
    console.log('1-c-order');
    setPointHistory(uid,0-this.data.usepoints);
    }
    try {
      await createOrderItemFromSku({ count: goods.num, orderId, skuId: directSku._id });
      // const totalPrice = goods.price * goods.num - this.data.usepoints * 0.01;

      await this.payImpl(orderId);
      wx.hideLoading();

    } catch (e) {
      this.failedAndBack('创建订单失败', e);
    }
  },

  failedAndBack(message, e) {
    e && console.error(e);
    this.toast(message);
    setTimeout(() => {
      wx.navigateBack();
    }, 1000);
  },

  // 提交订单
  async submitOrder() {
    const { userAddress } = this.data;
    if (!userAddress) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请添加收货地址',
        duration: 2000,
        icon: 'help-circle',
      });
      return;
    }

    if (this.type === 'cart') {
      this.submitOrderFromCart();
    } else if (this.type === 'direct') {
      this.submitOrderFromDirect();
    } else {
      console.error('invalid type', this.type);
      this.failedAndBack('初始化信息有误');
    }
  },
});
