import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSehemaValidation } from "../../../services/vaildators";
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from "../../../services/api/apiConfig";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthTitle from "../../Shared/AuthTitle/AuthTitle";
import AuthButton from "../../Shared/AuthButton/AuthButton";

type DataType = { email: string; password: string };

export default function Login() {
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSehemaValidation),
  });

  const [toggle, setToggle] = useState(false);

  const onSubmit = async (data: DataType) => {
    try {
      const response = await apiInstance.post(users_endpoints.LOGIN, data);
      localStorage.setItem("token", response.data.token);

      setToken(response?.data?.token);
      navigate("/dashboard");
      toast.success("Logged in successfully", {
        theme: "light",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };
  return (
    <div className="auth-content p-5">
      <AuthTitle title={"Login"} />

      <form
        className="authForm px-4 mt-4"
        role="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-group mb-1">
          <input
            {...register("email")}
            type="text"
            // className="form-control"
            placeholder="Enter your E-mail"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <div className="pb-3 text-danger">{errors.email.message}</div>
        )}

        <div className="input-group mb-1">
          <input
            {...register("password")}
            type={toggle ? "text" : "password"}
            // className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
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

        <div className="links d-flex justify-content-between my-3">
          <Link className="text-white" to="/register">
            Register?
          </Link>
          <Link className="text-white" to="/forget-password">
            Forget Password?
          </Link>
        </div>
        <AuthButton title="Login" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
