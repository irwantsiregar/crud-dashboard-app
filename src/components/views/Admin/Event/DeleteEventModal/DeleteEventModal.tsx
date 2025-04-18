import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteEventModal from "./useDeleteEventModal";

interface IDeleteEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  refetchEvents: () => void;
}

const DeleteEventModal = (props: IDeleteEventModalProps) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchEvents,
  } = props;

  const {
    mutateDeleteEvent,
    isPendingMutateDeleteEvent,
    isSuccessMutateDeleteEvent,
  } = useDeleteEventModal();

  useEffect(() => {
    if (isPendingMutateDeleteEvent) {
      onClose();
      refetchEvents();
    }
  }, [isPendingMutateDeleteEvent]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Event</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this event?
          </p>
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isSuccessMutateDeleteEvent}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            color="danger"
            onPress={() => mutateDeleteEvent(selectedId)}
            disabled={isSuccessMutateDeleteEvent}
            isLoading={isSuccessMutateDeleteEvent}
          >
            Delete Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEventModal;
