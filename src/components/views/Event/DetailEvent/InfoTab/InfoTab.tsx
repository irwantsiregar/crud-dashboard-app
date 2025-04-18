import { ICategory } from "@/types/Category";
import { IEvent, IEventForm } from "@/types/Event";
import { toInputDate } from "@/utils/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useInfoEvent from "./useInfoEvent";

interface InfoTabPropTypes {
  dataEvent: IEvent;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const InfoTab = (props: InfoTabPropTypes) => {
  const { dataEvent, onUpdate, isPendingUpdate, isSuccessUpdate } = props;

  const {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,

    dataCategory,
  } = useInfoEvent();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateInfo("name", `${dataEvent?.name}`);
      setValueUpdateInfo("description", `${dataEvent?.description}`);
      setValueUpdateInfo("slug", `${dataEvent?.slug}`);
      setValueUpdateInfo("startDate", toInputDate(dataEvent?.startDate ?? ""));
      setValueUpdateInfo("endDate", toInputDate(dataEvent?.endDate ?? ""));
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateInfo();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Information</h1>

        <p className="w-full text-small text-default-400">
          Manage information ot this event
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateInfo(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.name} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Name"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.name !== undefined}
                  errorMessage={errorsUpdateInfo.name?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.slug} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="slug"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Slug"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.slug !== undefined}
                  errorMessage={errorsUpdateInfo.slug?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.category} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="category"
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataCategory?.data?.data || []}
                  defaultSelectedKey={dataEvent?.category}
                  label="Category"
                  variant="bordered"
                  labelPlacement="outside"
                  isInvalid={errorsUpdateInfo.category !== undefined}
                  errorMessage={errorsUpdateInfo.category?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search category here..."
                >
                  {(category: ICategory) => (
                    <AutocompleteItem key={`${category._id}`}>
                      {category?.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.description} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateInfo.description !== undefined}
                  errorMessage={errorsUpdateInfo.description?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.startDate} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  isInvalid={errorsUpdateInfo.startDate !== undefined}
                  errorMessage={errorsUpdateInfo.startDate?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton isLoaded={!!dataEvent?.endDate} className="rounded-lg">
            <Controller
              control={controlUpdateInfo}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End Date"
                  variant="bordered"
                  hideTimeZone
                  showMonthAndYearPickers
                  isInvalid={errorsUpdateInfo.endDate !== undefined}
                  errorMessage={errorsUpdateInfo.endDate?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={typeof dataEvent?.isPublish === "boolean"}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateInfo}
              name="isPublish"
              render={({ field }) => (
                <Select
                  {...field}
                  label="Status"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isPublish !== undefined}
                  errorMessage={errorsUpdateInfo.isPublish?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[`${dataEvent?.isPublish}`]}
                >
                  <SelectItem key="true">Publish</SelectItem>

                  <SelectItem key="false">Draft</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={typeof dataEvent?.isFeatured === "boolean"}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateInfo}
              name="isFeatured"
              render={({ field }) => (
                <Select
                  {...field}
                  label="Featured"
                  variant="bordered"
                  isInvalid={errorsUpdateInfo.isFeatured !== undefined}
                  errorMessage={errorsUpdateInfo.isFeatured?.message}
                  disallowEmptySelection
                  defaultSelectedKeys={[`${dataEvent?.isFeatured}`]}
                >
                  <SelectItem key="true">Yes</SelectItem>

                  <SelectItem key="false">No</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Button
            type="submit"
            color="danger"
            className="mt-2 disabled:bg-default-500"
            disabled={isPendingUpdate || !dataEvent?._id}
            isLoading={isPendingUpdate}
          >
            Save Changes
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
