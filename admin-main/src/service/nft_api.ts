import { UserRole } from "@/type/user";
import { Nft, SimpleNftType } from "@/types/nft";
import { AxiosInstance } from "axios";

export class NftApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async getNft(
    collectionAddress: string,
    tokenId: string
  ): Promise<{
    data: { data: Nft };
  }> {
    return this.axios.get(`/nfts/${collectionAddress}/${tokenId}`);
  }

  public async getSameCreateUnitNfts(nftCreateUnitId: number) {
    return this.axios.get<{
      totalPage: number;
      totalCount: number;
      data: SimpleNftType[];
    }>(`/nfts/nft-create-unit/${nftCreateUnitId}`);
  }

  public async transferNft(
    collectionAddress: string,
    tokenId: string,
    toAddress: string
  ) {
    return this.axios.patch(`/nfts/transfer`, {
      collectionAddress,
      toAddress,
      tokenId,
    });
  }

  public async burnNft(collectionAddress: string, tokenId: string) {
    return this.axios.delete(`/nfts/burn`, {
      params: {
        collectionAddress,
        tokenId,
      },
    });
  }
}
