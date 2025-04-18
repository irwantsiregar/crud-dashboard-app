import useMediaHandling from "@/hooks/useMediaHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const updateIconSchema = yup.object().shape({
  icon: yup.mixed<FileList | string>().required("Please input icon"),
});

const useIconTab = () => {
  const {
    handleUploadFile,
    handleDeleteFile,
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdateIcon,
    handleSubmit: handleSubmitUpdateIcon,
    formState: { errors: errorsUpdateIcon },
    reset: resetUpdateIcon,
    watch: watchUpdateIcon,
    getValues: getValuesUpdateIcon,
    setValue: setValueUpdateIcon,
  } = useForm({
    resolver: yupResolver(updateIconSchema),
  });

  const preview = watchUpdateIcon("icon");
  const fileUrl = getValuesUpdateIcon("icon");

  const handleUploadIcon = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateIcon("icon", fileUrl);
      }
    });
  };

  const handleDeleteIcon = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    handleUploadIcon,
    handleDeleteIcon,

    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    resetUpdateIcon,
    watchUpdateIcon,
    getValuesUpdateIcon,
    setValueUpdateIcon,

    preview,
  };
};

export default useIconTab;
