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

type Data = { email: string; password: string };

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

  const onSubmit = async (data: Data) => {
    try {
      const response = await apiInstance.post(users_endpoints.LOGIN, data);
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);

      setToken(response?.data?.token);
      navigate("/dashboard");
      toast.success("Logged in successfully", {
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-100">
      <h3 className="h5">Log In</h3>
      <p className="text-muted">Welcome Back! Please enter your details</p>

      <form className="" role="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-3">
          <div className="input-group-prepend ">
            <span className="input-group-text">
              <i className="fa fa-envelope"></i>
            </span>
          </div>
          <input
            {...register("email")}
            type="text"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="Email"
            aria-describedby="basic-addon1"
          />
        </div>
        {errors.email && (
          <div className="pb-3 text-danger">{errors.email.message}</div>
        )}

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fa fa-lock"></i>
            </span>
          </div>

          <input
            {...register("password")}
            type={toggle ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon1"
          />
          <div className="input-group-append">
            <span
              className="input-group-text showpass"
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <i className={`fa ${toggle ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
        </div>

        {errors.password && (
          <div className="pb-3 text-danger">{errors.password.message}</div>
        )}

        <div className="links d-flex justify-content-between my-3">
          <Link className="text-black" to="/register">
            Register?
          </Link>
          <Link className="text-success" to="/forget">
            Forget Password?
          </Link>
        </div>
        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
