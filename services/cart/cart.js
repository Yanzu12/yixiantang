import { model, getAll } from '../../services/_utils/model';
import { config } from '../../config/index';
import { DATA_MODEL_KEY } from '../../config/model';

const CATE_ITEM_MODEL_KEY = DATA_MODEL_KEY.CART_ITEM;

/** 获取购物车mock数据 */
function mockFetchCartGroupData(params) {
  const { delay } = require('../_utils/delay');
  const { genCartGroupData } = require('../../model/cart');

  return delay().then(() => genCartGroupData(params));
}

/**
 *
 * @param {{id: string}} param0
 * @returns
 */
export async function getCartItem({ id }) {
  return model()[CATE_ITEM_MODEL_KEY].get({
    filter: {
      where: {
        _id: {
          $eq: id,
        },
      },
    },
    select: {
      _id: true,
      count: true,
      sku: {
        _id: true,
        count: true,
        description: true,
      },
    },
  });
}

export async function fetchCartItems(uid) {
  return getAll({
    name: CATE_ITEM_MODEL_KEY,
    select: {
      _id: true,
      count: true,
      sku: {
        _id: true,
        count: true,
        description: true,
      },
    },
    filter: {
        relateWhere: {
            purchaser: {
            where: {
              _id: {
                $eq: uid,
              },
            },
          },
        },
    },
  });
}

/**
 *
 * @param {{
 *   skuId: String,
 *   count: Number
 * }} param0
 */
export async function createCartItem({ skuId,count,uid }) {
    
   const res = await model()[CATE_ITEM_MODEL_KEY].create({
    data: {
      count,
      sku: { _id: skuId },
      purchaser:{ _id: uid },
    },
  });
  console.log('res',res);
  return res;
}

/**
 *
 * @param {{cartItemId: string}} param0
 */
export async function deleteCartItem({ cartItemId }) {
  return await model()[CATE_ITEM_MODEL_KEY].delete({
    filter: {
      where: {
        _id: {
          $eq: cartItemId,
        },
      },
    },
  });
}

/**
 *
 * @param {{
 *   cartItemId: String,
 *   count: Number
 * }} param0
 * @returns
 */
export async function updateCartItemCount({ cartItemId, count }) {
  return await model()[CATE_ITEM_MODEL_KEY].update({
    data: {
      count,
    },
    filter: {
      where: {
        _id: {
          $eq: cartItemId,
        },
      },
    },
  });
}

/** 获取购物车数据 */
export function fetchCartGroupData(params) {
  if (config.useMock) {
    return mockFetchCartGroupData(params);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}
