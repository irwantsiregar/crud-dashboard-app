import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteCategoryModal from "./useDeleteCategoryModal";

interface IDeleteCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
  refetchCategory: () => void;
}

const DeleteCategoryModal = (props: IDeleteCategoryModalProps) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchCategory,
  } = props;

  const {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  } = useDeleteCategoryModal();

  useEffect(() => {
    if (isSuccessMutateDeleteCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateDeleteCategory]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Category</ModalHeader>

        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this category?
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
            disabled={isPendingMutateDeleteCategory}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            color="danger"
            onPress={() => mutateDeleteCategory(selectedId)}
            disabled={isPendingMutateDeleteCategory}
            isLoading={isPendingMutateDeleteCategory}
          >
            Delete Category
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCategoryModal;
