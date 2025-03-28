import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthButton from "../../Shared/AuthButton/AuthButton";
import AuthTitle from "../../Shared/AuthTitle/AuthTitle";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSehemaValidation } from "../../../services/vaildators";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

type DataType = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ChangePassword() {

  useLocation();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<DataType>({
    mode: "onChange",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: yupResolver(changePasswordSehemaValidation),
  });

  const navigate = useNavigate();

  const [toggle, setToggle] = useState(false);
  const [toggleConfirm, setToggleConfirm] = useState(false);

  const onSubmit = async (data: DataType) => {
    try {
      // const response = await apiInstance.post(users_endpoints.CHANGE_PASSWORD, data);
      const response = await apiInstance.post(users_endpoints.CHANGE_PASSWORD, data);
      navigate("/login");

      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="auth-content p-5">
        <AuthTitle title={"Change Password"} />
        <form onSubmit={handleSubmit(onSubmit)} className="authForm px-4 mt-4">
          <div className="input-group mb-1">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              {...register("oldPassword")}
              type={toggle ? "text" : "password"}
              id="oldPassword"
              placeholder="Enter your Old Password"
              aria-label="oldPassword"
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
          {errors.oldPassword && (
            <div className="pb-3 text-danger">{errors.oldPassword.message}</div>
          )}

          <div className="input-group mb-1">
            <label htmlFor="newPassword">New Password</label>
            <input
              {...register("newPassword")}
              type={toggle ? "text" : "password"}
              id="newPassword"
              placeholder="Enter your New Password"
              aria-label="newPassword"
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
          {errors.newPassword && (
            <div className="pb-3 text-danger">{errors.newPassword.message}</div>
          )}

          <div className="input-group mb-1">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              {...register("confirmNewPassword")}
              type={toggleConfirm ? "text" : "password"}
              id="confirmNewPassword"
              placeholder="Confirm New Password"
              aria-label="confirmNewPassword"
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
          {errors.confirmNewPassword && (
            <div className="pb-3 text-danger">
              {errors.confirmNewPassword.message}
            </div>
          )}

          <AuthButton title="Save" isSubmitting={isSubmitting} />
        </form>
      </div>
    </>
  );
}
