export interface ApiResponseType<T> {
  success: boolean;
  error: string;
  data: T;
}
