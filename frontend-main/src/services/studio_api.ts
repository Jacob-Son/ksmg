import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { NftStudioUnit } from '~/types/studio';

const getStudio = async (creatorAddress: string, page: number) => {
  const response = await serviceApi.get<
    IApiResponse<{
      data: NftStudioUnit[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/studio/creator/${creatorAddress}`, {
    params: {
      page,
    },
  });
  return response.data;
};

const updatePrice = async (createUnitId: number, price: number) => {
  const response = await serviceApi.patch<IApiResponse<null>>(
    `/studio/${createUnitId}/price`,
    {
      price,
    },
  );
  return response.data;
};

const checkCreatorNameDuplicate = async (creatorName: string) => {
  const response = await serviceApi.get<IApiResponse<boolean>>(
    `/studio/creator/name/${creatorName}`,
  );
  return response.data;
};

const setCreatorProfile = async (
  creatorAddress: string,
  creatorName: string,
) => {
  const response = await serviceApi.post<IApiResponse<null>>(
    `/studio/creator/${creatorAddress}/profile`,
    { creatorName },
  );
  return response.data;
};

const deleteCreatedNft = async (createUnitId: number) => {
  const response = await serviceApi.delete<IApiResponse<null>>(
    `/studio/${createUnitId}`,
  );
  return response.data;
};

export const studioApi = {
  getStudio,
  updatePrice,
  checkCreatorNameDuplicate,
  setCreatorProfile,
  deleteCreatedNft,
};
