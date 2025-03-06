import { UserRole, LoginType } from "@/type/user";
import { AxiosInstance } from "axios";

export class UserApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async getUser(userAddress: string) {
    const res = this.axios.get(`/users/${userAddress}`);
    return (await res).data;
  }

  public async getUsers(
    page: number,
    searchType: string,
    searchKeyword: string
  ) {
    const res = this.axios.get("/users", {
      params: {
        page: page ?? 1,
        searchType,
        searchKeyword,
      },
    });
    return (await res).data;
  }

  public async changeRole(email: string, loginType: LoginType, role: UserRole) {
    return this.axios.patch(`/users/role`, {
      email,
      loginType,
      role,
    });
  }

  public async deleteUser(userAddress: string) {
    return this.axios.delete(`/users/${userAddress}`);
  }
}
