import { DATA_MODEL_KEY } from '../../config/model';
import { getAll, model } from '../_utils/model';

const USER_MODEL_KEY = DATA_MODEL_KEY.USER;
const USER_STORAGE_KEY = "userInfo";

export function getUser(){
    return new Promise((resolve, reject) => {
        // 获取本地用户缓存
        wx.getStorage({
            key: USER_STORAGE_KEY,
            success (res) {
            //正式环境：通过缓存本地读取
            // console.log('res',res)
            // if(typeof(res.data) != 'undefined'){
            //     console.log("read store",res.data);
            //     resolve( res.data );
            // }else{
            //     const userInfo = getUserFromCloud();
            //     resolve( userInfo);
            // }
            //测试环境：数据库远程读取
              const userInfo = getUserFromCloud();
              console.log('debug',userInfo)
              resolve(userInfo);
            },
            fail(error){
                console.log('error',error);
                const userInfo = getUserFromCloud();
                resolve(userInfo);
            }
        })
    })
}

async function getUserFromCloud() {
    //获取用户并注册
    const res = await wx.cloud.callFunction({
        name: 'get_wxuser_id',
    });
    console.log('res_fuc',res);
    // 缓存用户信息
    wx.setStorage({
        key:USER_STORAGE_KEY,
        data:res.result,
    })
    return res.result;
}

/**
 *
 * @param {{
 *   name,
 *   address,
 *   phone,
 *   _id,
 *   location
 * }} param0
 */
export async function updateUser({ uid, data }) {
    const res = await wx.cloud.callFunction({
        // 云函数名称
        name: 'update_user',
        // 传给云函数的参数
        data: {
          uid,
          data,
        },
      });
    
    console.log("res",res.result);
    // { count: 1}
    if( res.result.data.count == 1 ){
        let up = await getUserFromCloud();
        return up;
    }else{
        return {'error':-1};
    }
}