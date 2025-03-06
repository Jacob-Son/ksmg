import { IApiResponse } from '~/types/api';
import serviceApi from './api';
import { IEvent } from '~/types/event';

const getEvents = async (page: string) => {
  const response = await serviceApi.get<
    IApiResponse<{
      events: IEvent[];
      totalCount: number;
      totalPage: number;
    }>
  >(`/events`, {
    params: { page },
  });
  return response.data;
};

const getEventById = async (eventId: string) => {
  const response = await serviceApi.get<IApiResponse<IEvent>>(
    '/events/' + eventId,
  );
  return response.data;
};

export const eventApi = {
  getEvents,
  getEventById,
};
