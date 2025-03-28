import { useForm } from "react-hook-form";
import AuthButton from "../../Shared/AuthButton/AuthButton";
import AuthTitle from "../../Shared/AuthTitle/AuthTitle";
// import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  let {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request",
        data
      );
      console.log(response);

      navigate("/reset-password");
      toast.success("Otp sent successfully", {
        theme: "light",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="auth-content p-5">
        <AuthTitle title={"Forget Password"} />

        <form onSubmit={handleSubmit(onSubmit)} className="authForm px-4 mt-4">
          <div className="input-group mb-1">
            <label htmlFor="email">E-mail</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address.",
                },
              })}
              type="email"
              placeholder="Enter your E-mail"
              aria-label="email"
              aria-describedby="basic-addon1"
            />
          </div>

          {errors.email && (
            <span className="bg-danger px-2 rounded-2 my-2 text-white">
              {String(errors.email.message)}
            </span>
          )}

          <AuthButton title="Verify" isSubmitting={isSubmitting} />
        </form>
      </div>
    </>
  );
}
