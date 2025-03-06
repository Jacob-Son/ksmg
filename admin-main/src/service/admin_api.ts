import { Banner } from "@/type/banner";
import { Recommend } from "@/type/recommend";
import { CombineDelivery } from "@/types/combine";
import { IUser } from "@/types/user";
import { AxiosInstance } from "axios";

export class AdminApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async createBanner(form: FormData) {
    return this.axios.post("/admin/banner", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public async getBannerList() {
    return this.axios.get("/home/banner");
  }

  public async deleteBanner(bannerId: number) {
    return this.axios.delete(`/admin/banner/${bannerId}`);
  }

  public async reorderBanner(
    bannerInfos: { bannerId: number; order: number }[]
  ) {
    return this.axios.patch(`/admin/banner/order`, { bannerInfos });
  }

  public async createRecommend(form: FormData) {
    return this.axios.post("/admin/recommend", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public async getRecommendList() {
    return this.axios.get("/home/recommend");
  }

  public async deleteRecommend(recommendId: number) {
    return this.axios.delete(`/admin/recommend/${recommendId}`);
  }

  public async reorderRecommend(
    recommendInfos: { recommendId: number; order: number }[]
  ) {
    return this.axios.patch(`/admin/recommend/order`, { recommendInfos });
  }

  public async getPlatformFee() {
    return this.axios.get("/admin/platform-fee");
  }

  public async updatePlatformFee(platformFee: number) {
    return this.axios.patch("/admin/platform-fee", { platformFee });
  }

  public async hideNftCreateUnit(nftCreateUnitId: number, isHidden: boolean) {
    return this.axios.patch(`/admin/nft-create-unit/${nftCreateUnitId}/hide`, {
      isHidden,
    });
  }

  public async deleteNftCreateUnit(nftCreateUnitId: number) {
    return this.axios.delete(`/admin/nft-create-unit/${nftCreateUnitId}`);
  }

  public async getNftCreateUnitList(page: number) {
    return this.axios.get("/admin/nft-create-unit", {
      params: {
        page,
      },
    });
  }

  public async getSettleReqeustList(isSettled: boolean) {
    return this.axios.get("/admin/settle/request", {
      params: {
        isSettled,
      },
    });
  }

  public async getSettleList(settleIds: number[]) {
    return this.axios.get("/admin/settle/list", {
      params: {
        settleIds,
      },
    });
  }

  public async confirmSettle(settleIds: number[]) {
    return this.axios.post(`/admin/settle/confirm`, { settleIds });
  }

  public async rejectSettle(settleId: number, reason: string) {
    return this.axios.post(`/admin/settle/${settleId}/reject`, { reason });
  }

  public async getDeliverReqeustList() {
    return this.axios.get("/admin/delivery");
  }

  public async updateDelivery(
    deliveryId: number,
    data: Partial<CombineDelivery>
  ) {
    return this.axios.patch(`/admin/delivery/${deliveryId}`, { data });
  }

  public async sendAuctionResult(auctionId: number) {
    return this.axios.post(`/admin/send-auction-result/${auctionId}`);
  }

  public async getOrders({
    page,
    limit,
    startDate,
    endDate,
    searchType,
    searchKeyword,
    isDelivery,
  }: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    searchType?:
      | "nftSaleId"
      | "buyerAddress"
      | "sellerAddress"
      | "tokenId"
      | "buyerName"
      | "sellerName";
    searchKeyword?: string;
    isDelivery?: boolean;
  }) {
    const params: any = {
      page,
      limit,
      startDate,
      endDate,
      isDelivery,
    };
    if (searchType && searchKeyword) {
      params[searchType] = searchKeyword;
    }
    return this.axios.get("/admin/orders", { params });
  }

  public async updateOrderDeliveryStatus(nftSaleId: number, status: string) {
    return this.axios.patch(`/admin/nftSale/${nftSaleId}/delivery`, {
      status,
      nftSaleId,
    });
  }

  public async getUser(userAddress: string) {
    const res = await this.axios.get<{
      data: IUser;
    }>(`/admin/user/${userAddress}`);
    return res.data;
  }
}
