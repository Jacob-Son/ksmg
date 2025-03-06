import { Keys } from "@/store/keys";
import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosRequestTransformer,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AuctionApi } from "./auction_api";
import { UserApi } from "./user_api";
import { EventApi } from "./event_api";
import { AdminApi } from "./admin_api";
import { AuthApi } from "./auth_api";
import { NftApi } from "./nft_api";
import { FaqApi } from "./faq_api";
import { NoticeApi } from "./notice_api";

export namespace API {
  /**
   * 리퀘스트중인 url 목록.
   *
   * 동일한 url을 중복해서 호출하는 것을 막기 위한 배열이며, interceptor에서 해당 목록에
   * end point를 추가 및 제거한다.
   */
  const awaitingUrls = new Set<string>();

  /** ⭐️ 실제 통신을 진행하는 객체 */
  const _axios = createCustomAxios();

  function requestInterceptor(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig<any> {
    // 응답 대기중인지 확인한다
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["authorization"] = `${token}`;
    }
    return {
      ...config,
    };
  }

  function createCustomAxios(): AxiosInstance {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const customAxios = axios.create({
      baseURL: baseUrl,
      responseType: "json",
      responseEncoding: "utf8",
    });
    customAxios.defaults.headers.post["Content-Type"] = "application/json";
    customAxios.interceptors.request.use(requestInterceptor);
    return customAxios;
  }

  export const Auction = new AuctionApi(_axios);
  export const User = new UserApi(_axios);
  export const Event = new EventApi(_axios);
  export const Admin = new AdminApi(_axios);
  export const Auth = new AuthApi(_axios);
  export const Nft = new NftApi(_axios);
  export const Faq = new FaqApi(_axios);
  export const Notice = new NoticeApi(_axios);
}
