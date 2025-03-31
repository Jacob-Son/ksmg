export enum EventType {
  EVENT = "EVENT",
  CULURE = "SALE",
}

export type IEvent = {
  eventId: number;
  title: string;
  description: string;
  imagePath: string;
  eventType: EventType;
  startDay: Date;
  endDay: Date;
  createdAt: Date;
  updatedAt: Date;
  externalUrl?: string;
  detailImagePath?: string;
};
