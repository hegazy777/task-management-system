import { useForm } from "react-hook-form";
import AuthButton from "../../Shared/AuthButton/AuthButton";
import AuthTitle from "../../Shared/AuthTitle/AuthTitle";
// import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetSehemaValidation } from "../../../services/vaildators";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";

type DataType = { email: string };

export default function ForgotPassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(forgetSehemaValidation),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: DataType) => {
    try {
      const response = await apiInstance.post(
        users_endpoints.RESET_REQUEST,
        data
      );
      navigate("/reset-password", { state: { email: data.email } });

      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  return (
    <div className="auth-content p-5">
      <AuthTitle title={"Forget Password"} />

      <form onSubmit={handleSubmit(onSubmit)} className="authForm px-4 mt-4">
        <div className="input-group mb-1">
          <label htmlFor="email">E-mail</label>
          <input
            {...register("email")}
            type="email"
            placeholder="Enter your E-mail"
            aria-label="email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <div className="pb-3 text-danger">{errors.email.message}</div>
        )}

        <AuthButton title="Verify" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
