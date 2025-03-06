export enum EventType {
  EVENT = "EVENT",
  CULTURE = "CULTURE",
}

export type Event = {
  eventId: number;
  title: string;
  description: string;
  imagePath: string;
  detailImagePath: string;
  eventType: EventType;
  startDay: Date;
  endDay: Date;
  externalUrl: string;

  createdAt: Date;
  updatedAt: Date;
};
