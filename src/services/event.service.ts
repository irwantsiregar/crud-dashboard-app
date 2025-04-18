import instance from "@/libs/axios/instance";
import { IEvent } from "@/types/Event";
import endpoint from "./endpoint.constant";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  getEventById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
  addEvent: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
  searchLocationByRegion: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  updateEvent: (id: string, payload: IEvent) =>
    instance.put(`${endpoint.EVENT}/${id}`, payload),
  getRegencyById: (id: string) =>
    instance.get(`${endpoint.REGION}/${id}/regency`),
};

export default eventServices;
