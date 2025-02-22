import updateManager from './common/updateManager';
import { init } from '@cloudbase/wx-cloud-client-sdk';
import { getUser, Userinit } from './services/usercenter/user';

wx.cloud.init({
    env: 'yixiantang-5g38r1z8c748da0b', // 指定云开发环境 ID
});



const client = init(wx.cloud);
const models = client.models;
globalThis.dataModel = models;
// 接下来就可以调用 models 上的数据模型增删改查等方法了

App({
  onLaunch: function () {
    Userinit();
  },
  onShow: function () {
    updateManager();
    
  },
});
