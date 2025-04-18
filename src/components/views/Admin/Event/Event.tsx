import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import AddEventModal from "./AddEventModal";
import DeleteEventModal from "./DeleteEventModal/DeleteEventModal";
import { COLUMN_LISTS_EVENT } from "./Event.constants";
import useEvent from "./useEvent";

const Category = () => {
  const { push, isReady, query } = useRouter();

  const {
    dataEvents,

    isLoadingEvents,
    isRefetchingEvents,

    refetchEvents,
    selectedId,
    setSelectedId,
  } = useEvent();

  const addEventsModal = useDisclosure();
  const deleteEventsModal = useDisclosure();

  const { setURL } = useChangeUrl();

  useEffect(() => {
    if (isReady) setURL();
  }, [isReady]);

  const renderCell = useCallback(
    (event: Record<string, unknown>, columKey: Key) => {
      const cellValue = event[columKey as keyof typeof event];

      const isURL = typeof cellValue === "string" && cellValue.includes("http");

      switch (columKey) {
        case "banner":
          return (
            <Image
              className="aspect-video w-36 rounded-lg object-cover"
              src={`${isURL ? cellValue : ""}`}
              alt="event"
              width={200}
              height={100}
            />
          );
        case "isPublish":
          return (
            <Chip
              size="sm"
              variant="flat"
              color={cellValue ? "success" : "warning"}
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${event?._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${event._id}`);
                deleteEventsModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LISTS_EVENT}
          data={dataEvents?.data || []}
          emptyContent="Event is empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
          onClickButtonTopContent={addEventsModal.onOpen}
          renderCell={renderCell}
          totalPages={dataEvents?.pagination?.totalPages}
        />
      )}

      <AddEventModal {...addEventsModal} refetchEvents={refetchEvents} />

      <DeleteEventModal
        {...deleteEventsModal}
        refetchEvents={refetchEvents}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Category;
