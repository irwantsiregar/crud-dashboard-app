import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddCategoryModal from "./useAddCategoryModal";

interface IAddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchCategory: () => void;
}

const AddCategoryModal = (props: IAddCategoryModalProps) => {
  const { isOpen, onClose, onOpenChange, refetchCategory } = props;

  const {
    control,
    errors,
    preview,
    handleSubmitForm,
    handleAddCategory,
    handleUploadIcon,
    handleDeleteIcon,
    handleOnClose,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useAddCategoryModal();

  useEffect(() => {
    if (isSuccessMutateAddCategory) {
      onClose();
      refetchCategory();
    }
  }, [isSuccessMutateAddCategory]);

  const disabledSubmit =
    isPendingMutateAddCategory ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitForm(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Category</ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>

              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    className="mb-2"
                  />
                )}
              />

              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Description"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    className="mb-2"
                  />
                )}
              />

              <p className="text-sm font-bold">Icon</p>

              <Controller
                name="icon"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    onDelete={() => handleDeleteIcon(onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isDeleting={isPendingMutateDeleteFile}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    preview={typeof preview === "string" ? preview : ""}
                    isDropable
                  />
                )}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              color="danger"
              disabled={disabledSubmit}
              isLoading={isPendingMutateAddCategory}
            >
              Create Category
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddCategoryModal;
