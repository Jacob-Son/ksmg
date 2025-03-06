import { AxiosInstance } from "axios";

export class AuctionApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async createAuction(form: FormData) {
    return this.axios.post("/auctions", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public async getAuctionList() {
    return this.axios.get("/auctions");
  }

  public async deleteAuction(auctionId: number) {
    return this.axios.delete(`/auctions/${auctionId}`);
  }
}
