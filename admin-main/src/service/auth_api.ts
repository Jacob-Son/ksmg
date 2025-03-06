import { AxiosInstance } from "axios";

export class AuthApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async signIn(accessToken: string) {
    const res = this.axios.post(
      `/auth/signIn`,
      {},
      {
        headers: {
          authorization: accessToken,
        },
      }
    );
    return (await res).data;
  }
}
