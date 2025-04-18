import { IEventForm, IRegency } from "@/types/Event";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useLocationTab from "./useLocationTab";

interface ILocationTabPropTypes {
  dataEvent: IEventForm;
  dataDefaultRegion: string;
  isPendingDefaultRegion: boolean;
  onUpdate: (data: IEventForm) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
}

const LocationTab = (props: ILocationTabPropTypes) => {
  const {
    dataEvent,
    dataDefaultRegion,
    isPendingDefaultRegion,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;

  const {
    controlUpdateLocation,
    handleSubmitUpdateLocation,
    errorsUpdateLocation,
    resetUpdateLocation,
    setValueUpdateLocation,

    dataRegion,
    handleSearchRegion,
  } = useLocationTab();

  useEffect(() => {
    if (dataEvent) {
      setValueUpdateLocation("isOnline", `${dataEvent?.name}`);
      setValueUpdateLocation("region", `${dataEvent?.location?.region}`);
      setValueUpdateLocation(
        "latitude",
        `${dataEvent?.location?.coordinates[0]}`,
      );
      setValueUpdateLocation(
        "longitude",
        `${dataEvent?.location?.coordinates[1]}`,
      );
    }
  }, [dataEvent]);

  useEffect(() => {
    if (isSuccessUpdate) {
      resetUpdateLocation();
    }
  }, [isSuccessUpdate]);

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Location</h1>

        <p className="w-full text-small text-default-400">
          Manage Location this event
        </p>
      </CardHeader>

      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateLocation(onUpdate)}
        >
          <Skeleton isLoaded={!!dataEvent?.isOnline} className="rounded-lg">
            <Controller
              control={controlUpdateLocation}
              name="isOnline"
              render={({ field }) => (
                <Select
                  {...field}
                  label="Online / Offline"
                  variant="bordered"
                  labelPlacement="outside"
                  defaultSelectedKeys={[`${dataEvent?.isOnline}`]}
                  isInvalid={errorsUpdateLocation.isOnline !== undefined}
                  errorMessage={errorsUpdateLocation.isOnline?.message}
                  disallowEmptySelection
                >
                  <SelectItem key="true">Online</SelectItem>

                  <SelectItem key="false">Offline</SelectItem>
                </Select>
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[0]}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateLocation}
              name="latitude"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateLocation.latitude !== undefined}
                  errorMessage={errorsUpdateLocation.latitude?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.coordinates[1]}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateLocation}
              name="longitude"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Latitude"
                  labelPlacement="outside"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateLocation.longitude !== undefined}
                  errorMessage={errorsUpdateLocation.longitude?.message}
                />
              )}
            />
          </Skeleton>

          <Skeleton
            isLoaded={!!dataEvent?.location?.region && !isPendingDefaultRegion}
            className="rounded-lg"
          >
            <Controller
              control={controlUpdateLocation}
              name="region"
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataRegion?.data?.data || []}
                  defaultInputValue={dataDefaultRegion}
                  label="City"
                  variant="bordered"
                  labelPlacement="outside"
                  type="text"
                  onInputChange={(value) => handleSearchRegion(value)}
                  isInvalid={errorsUpdateLocation.region !== undefined}
                  errorMessage={errorsUpdateLocation.region?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search city here..."
                >
                  {(regency: IRegency) => (
                    <AutocompleteItem key={`${regency.id}`}>
                      {regency?.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
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

export default LocationTab;
