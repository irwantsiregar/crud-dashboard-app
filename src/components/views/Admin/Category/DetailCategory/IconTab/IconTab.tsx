import InputFile from "@/components/ui/InputFile";
import { ICategory } from "@/types/Category";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useIconTab from "./useIconTab";

interface IconTabPropTypes {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const IconTab = (props: IconTabPropTypes) => {
  const { currentIcon, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    handleUploadIcon,
    handleDeleteIcon,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    resetUpdateIcon,

    preview,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateIcon();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>

        <p className="w-full text-small text-default-400">
          Manage icon ot this category
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>

            <Skeleton
              isLoaded={!!currentIcon}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="Icon" fill className="!relative" />
            </Skeleton>
          </div>

          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                onDelete={() => handleDeleteIcon(onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateIcon.icon !== undefined}
                errorMessage={errorsUpdateIcon.icon?.message}
                preview={typeof preview === "string" ? preview : ""}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Icon
                  </p>
                }
                isDropable
              />
            )}
          />

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}
            isLoading={isPendingUpdate}
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
