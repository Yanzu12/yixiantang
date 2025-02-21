//import {getUser} from '../usercenter/user'

export function setPointHistory(uid,point_change){
  setPointHistoryFromCloud(uid,point_change)
}

async function setPointHistoryFromCloud(uid,point_change) {
  const res = await wx.cloud.callFunction({
      name: 'point_history',
      data: {
        uid,
        point_change
      }
  });
}