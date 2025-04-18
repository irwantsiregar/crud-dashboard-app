import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const updateInfoSchema = yup.object().shape({
  name: yup.string().required("Please input name"),
  description: yup.string().required("Please input description"),
});

const useInfoCategory = () => {
  const {
    control: controlUpdateInfo,
    handleSubmit: handleSubmitUpdateInfo,
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo,
  } = useForm({
    resolver: yupResolver(updateInfoSchema),
  });

  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  };
};

export default useInfoCategory;
