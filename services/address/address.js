import { DATA_MODEL_KEY } from '../../config/model';
import { getAll, model } from '../_utils/model';

const DELIVERY_INFO_MODEL_KEY = DATA_MODEL_KEY.DELIVERY_INFO;

export function getAllAddress(uid) {
  return getAll({
    name: DELIVERY_INFO_MODEL_KEY,
    select: {
      _id: true,
      phone: true,
      address: true,
      name: true,
      location: true,
      user: {
        _id: true,
      }
    },
    filter: {
        relateWhere: {
          user: {
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
 *   name: String,
 *   address: String,
 *   phone: String,
 * }} param0
 * @returns
 */
export function createAddress({ name, address, phone,location,uid }) {
  return model()[DELIVERY_INFO_MODEL_KEY].create({
    data: {
      name,
      address,
      phone,
      location,
      user:{
          _id: uid,
      }
    },
  });
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
export function updateAddress({ name, address, phone, _id,location }) {
  return model()[DELIVERY_INFO_MODEL_KEY].update({
    data: {
      name,
      address,
      phone,
      location,
    },
    filter: {
      where: {
        _id: { $eq: _id },
      },
    },
  });
}

export function deleteAddress({ id }) {
  return model()[DELIVERY_INFO_MODEL_KEY].delete({
    filter: {
      where: {
        _id: {
          $eq: id,
        },
      },
    },
  });
}

export async function getAddress({ id }) {
  return (
    await model()[DELIVERY_INFO_MODEL_KEY].get({
      filter: {
        where: {
          _id: {
            $eq: id,
          },
        },
      },
    })
  ).data;
}
