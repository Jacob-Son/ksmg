import { AxiosInstance } from "axios";

export class NoticeApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async createNotice(title: string, content: string) {
    return this.axios.post("/notices", {
      title,
      content,
    });
  }

  public async getNoticeList() {
    return this.axios.get("/notices");
  }

  public async deleteNotice(noticeId: number) {
    return this.axios.delete(`/notices/${noticeId}`);
  }
}
