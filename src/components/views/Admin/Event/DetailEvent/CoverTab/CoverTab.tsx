import InputFile from "@/components/ui/InputFile";
import { IEvent } from "@/types/Event";
import { Button, Card, CardBody, CardHeader, Skeleton } from "@heroui/react";
import Image from "next/image";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useCoverTab from "./useCoverTab";

interface ICoverTabPropTypes {
  currentCover: string;
  onUpdate: (data: IEvent) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const CoverTab = (props: ICoverTabPropTypes) => {
  const { currentCover, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    handleUploadCover,
    handleDeleteCover,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    controlUpdateCover,
    handleSubmitUpdateCover,
    errorsUpdateCover,
    resetUpdateCover,

    preview,
  } = useCoverTab();

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateCover();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Cover</h1>

        <p className="w-full text-small text-default-400">
          Manage Cover ot this event
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Cover</p>

            <Skeleton
              isLoaded={!!currentCover}
              className="aspect-video rounded-lg"
            >
              <Image src={currentCover} alt="Cover" fill className="!relative" />
            </Skeleton>
          </div>

          <Controller
            name="banner"
            control={controlUpdateCover}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadCover(files, onChange)}
                onDelete={() => handleDeleteCover(onChange)}
                isUploading={isPendingMutateUploadFile}
                isDeleting={isPendingMutateDeleteFile}
                isInvalid={errorsUpdateCover.banner !== undefined}
                errorMessage={errorsUpdateCover.banner?.message}
                preview={typeof preview === "string" ? preview : ""}
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Cover
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

export default CoverTab;
