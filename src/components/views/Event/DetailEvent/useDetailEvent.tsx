import { ToasterContext } from "@/contexts/ToasterContext";
import eventServices from "@/services/event.service";
import { IEvent, IEventForm } from "@/types/Event";
import { toDateStandar } from "@/utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailEvent = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getEventById = async (id: string) => {
    const { data } = await eventServices.getEventById(id);

    return data.data;
  };

  const { data: dataEvent, refetch: refetchEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: () => getEventById(`${query.id}`),
    enabled: isReady,
  });

  const updateEvent = async (payload: IEvent) => {
    const response = await eventServices.updateEvent(`${query.id}`, payload);

    return response?.data?.data;
  };

  const {
    mutate: mutateUpdateEvent,
    isPending: isPendingMutateUpdateEvent,
    isSuccess: isSuccessMutateUpdateEvent,
  } = useMutation({
    mutationFn: updateEvent,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message,
      });
    },
    onSuccess: () => {
      refetchEvent();

      setToaster({
        type: "success",
        message: "Success update Event",
      });
    },
  });

  const handleUpdateEvent = (data: IEvent) => mutateUpdateEvent(data);

  const handleUpdateEventInfo = (data: IEventForm) => {
    const payload = {
      ...data,
      isFeatured: Boolean(data.isFeatured),
      isPublish: Boolean(data.isPublish),
      startDate: data?.startDate ? toDateStandar(data.startDate) : "",
      endDate: data?.endDate ? toDateStandar(data.endDate) : "",
    };

    mutateUpdateEvent(payload);
  };

  const handleUpdateEventLocation = (data: IEventForm) => {
    const payload = {
      isOnline: Boolean(data.isOnline),
      location: {
        region: data.region ?? "",
        coordinates: [Number(data.latitude), Number(data.longitude)],
      },
      banner: data.banner,
    };

    mutateUpdateEvent(payload);
  };

  const { data: dataDefaultRegion, isPending: isPendingDefaultRegion } =
    useQuery({
      queryKey: ["DefaultRegion"],
      queryFn: () => eventServices.getRegencyById(dataEvent?.location?.region),
      enabled: !!dataEvent?.location?.region,
    });

  return {
    dataEvent,
    mutateUpdateEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,

    handleUpdateEvent,
    handleUpdateEventInfo,
    handleUpdateEventLocation,

    dataDefaultRegion,
    isPendingDefaultRegion,
  };
};

export default useDetailEvent;
