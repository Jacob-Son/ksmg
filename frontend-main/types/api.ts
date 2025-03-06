export interface IApiResponse<T> {
  success: boolean;
  error: string;
  data: T;
}
