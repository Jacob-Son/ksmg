import { IApiResponse } from '~/types/api';
import serviceApi from './api';

const uploadImage = async (file: File, path: string) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('path', path);
  const response = await serviceApi.post<IApiResponse<string>>(
    `/images`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const imageApi = {
  uploadImage,
};
