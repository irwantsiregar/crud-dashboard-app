import { DateValue } from "@heroui/react";

interface IRegency {
  name: string;
  id: string;
}

interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFeatured?: boolean | string;
  isPublish?: boolean | string;
  isOnline?: boolean | string;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: {
    region: string;
    coordinates: Array<number | string>;
  };
  banner?: string | FileList;
}

interface IEventForm extends IEvent {
  region?: string;
  startDate?: DateValue;
  endDate?: DateValue;
  longitude?: number | string;
  latitude?: number | string;
}

export type { IRegency, IEvent, IEventForm };
