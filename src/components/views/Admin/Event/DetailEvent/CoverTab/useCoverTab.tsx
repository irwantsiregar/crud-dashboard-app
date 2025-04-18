import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const updateCoverSchema = yup.object().shape({
  banner: yup.mixed<FileList | string>().required("Please input cover"),
});

const useCoverTab = () => {
  const {
    mutateUploadFile,
    isPendingMutateUploadFile,
    mutateDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateCover,
    handleSubmit: handleSubmitUpdateCover,
    formState: { errors: errorsUpdateCover },
    reset: resetUpdateCover,
    watch: watchUpdateCover,
    getValues: getValuesUpdateCover,
    setValue: setValueUpdateCover,
  } = useForm({
    resolver: yupResolver(updateCoverSchema),
  });

  const preview = watchUpdateCover("banner");

  const handleUploadCover = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length !== 0) {
      onChange(files);

      mutateUploadFile({
        file: files[0],
        callback: (fileUrl: string) => {
          setValueUpdateCover("banner", fileUrl);
        },
      });
    }
  };

  const handleDeleteCover = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    const fileUrl = getValuesUpdateCover("banner");

    if (typeof fileUrl === "string") {
      mutateDeleteFile({ fileUrl, callback: () => onChange(undefined) });
    }
  };

  return {
    handleUploadCover,
    handleDeleteCover,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    controlUpdateCover,
    handleSubmitUpdateCover,
    errorsUpdateCover,
    resetUpdateCover,
    watchUpdateCover,
    getValuesUpdateCover,
    setValueUpdateCover,

    preview,
  };
};

export default useCoverTab;
