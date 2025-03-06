import { AxiosInstance } from "axios";

export class EventApi {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  public async createEvent(form: FormData) {
    return this.axios.post("/events", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public async getEventList() {
    return this.axios.get("/events");
  }

  public async deleteEvent(eventId: number) {
    return this.axios.delete(`/events/${eventId}`);
  }
}
