import { AxiosInstance } from "axios";

export class FaqApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async createFaq(title: string, content: string) {
    return this.axios.post("/faqs", {
      title,
      content,
    });
  }

  public async getFaqList() {
    return this.axios.get("/faqs");
  }

  public async deleteFaq(faqId: number) {
    return this.axios.delete(`/faqs/${faqId}`);
  }
}
