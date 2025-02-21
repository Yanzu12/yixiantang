//import {getUser} from '../usercenter/user'

export function getPointHistory(uid){
  return getPointHistoryFromCloud(uid)
}

async function getPointHistoryFromCloud(uid) {
  const res = await wx.cloud.callFunction({
      name: 'Load_point_history',
      data: {
        uid
      }
  });
  return res.result.data;
}