import { useNavigate } from "react-router-dom";
import AuthButton from "../../Shared/AuthButton/AuthButton";
// import AuthLogo from "../../Shared/AuthLogo/AuthLogo";
import AuthTitle from "../../Shared/AuthTitle/AuthTitle";
// import styles from "./ResetPassword.module.css";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { resetSehemaValidation } from "../../../services/vaildators";
import { yupResolver } from "@hookform/resolvers/yup";

type DataType = {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
};
export default function ResetPassword() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(resetSehemaValidation),
  });
  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);

  const onSubmit = async (data: DataType) => {
    try {
      const response = await apiInstance.post(users_endpoints.RESET, data);
      navigate("/");

      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  return (
    <div className="auth-content p-5">
      <AuthTitle title={"Reset Password"} />
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
        <div className="input-group mb-1">
          <label htmlFor="email">OTP Verification</label>
          <input
            {...register("seed", {
              required: "Otp is required",
              pattern: {
                value: /^[A-Za-z0-9]{4,8}$/,
                message:
                  "OTP must be 4 to 8 characters long and contain only letters and numbers.",
              },
            })}
            type="text"
            id="seed"
            placeholder="Enter Verification"
            aria-label="seed"
            aria-describedby="basic-addon2"
          />
        </div>
        {errors.seed && (
          <div className="pb-3 text-danger">{errors.seed.message}</div>
        )}

        <div className="input-group mb-1">
          <label htmlFor="email">New Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your New Password"
            aria-label="password"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <span
              className="input-group-text"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <FontAwesomeIcon icon={toggle ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        {errors.password && (
          <div className="pb-3 text-danger">{errors.password.message}</div>
        )}

        <div className="input-group mb-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="Confirm New Password"
            aria-label="confirmPassword"
            aria-describedby="basic-addon2"
          />

          <div className="input-group-append">
            <span
              className="input-group-text"
              onClick={() => {
                setToggleConfirm(!toggleConfirm);
              }}
            >
              <FontAwesomeIcon icon={toggleConfirm ? faEyeSlash : faEye} />
            </span>
          </div>
        </div>
        {errors.confirmPassword && (
          <div className="pb-3 text-danger">
            {errors.confirmPassword.message}
          </div>
        )}

        <AuthButton title="Save" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
