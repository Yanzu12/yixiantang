import { model } from '../_utils/model';
import { getCloudImageTempUrl } from '../../utils/cloudImageHandler';
import { SPU_SELLING_STATUS } from '../../utils/spuStatus';
import { DATA_MODEL_KEY } from '../../config/model';

const SPU_MODEL_KEY = DATA_MODEL_KEY.SPU;
const SKU_MODEL_KEY = DATA_MODEL_KEY.SKU;

/**
 *
 * @param {{
 *   pageSize: Number,
 *   pageNumber: Number,
 *   cateId: String,
 *   search: String
 * }}} param0
 * @returns
 */
export async function listGood({ pageSize, pageNumber, search }) {
  const select = {
    _id:true,
    name: true,
    cover_image:true
  };
  const filter = {
    where: {
      status: { $eq: SPU_SELLING_STATUS },
    },
  };
  if (search) {
    filter.where.name = { $search: search };
  }
  console.log(await model()[SPU_MODEL_KEY].list({
    filter,
    select,
    pageSize,
    pageNumber,
    getCount: true,
    orderBy: [{ priority: 'desc' }],
  }));
  return (
    await model()[SPU_MODEL_KEY].list({
      filter,
      select,
      pageSize,
      pageNumber,
      getCount: true,
      orderBy: [{ priority: 'desc' }],
    })
  ).data;
}

export async function getPrice(spuId) {
  const {
    data: { records },
  } = await model()[SKU_MODEL_KEY].list({
    filter: {
      where: {
        spu: {
          $eq: spuId,
        },
      },
    },
  });
  return records[0].price;
}

export async function handleSpuCloudImage(spu) {
  if (spu == null) {
    return;
  }
  const handledImages = await getCloudImageTempUrl([spu.cover_image, ...spu.swiper_images]);
  handledImages.forEach((image, index) => {
    if (index === 0) {
      spu.cover_image = image;
      return;
    }
    spu.swiper_images[index - 1] = image;
  });
}

export async function getSpu(spuId) {
  return (
    await model()[SPU_MODEL_KEY].get({
      filter: {
        where: { _id: { $eq: spuId } },
      },
    })
  ).data;
}
