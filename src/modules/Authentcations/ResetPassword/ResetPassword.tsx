import { useNavigate } from "react-router-dom";
import AuthButton from "../../Shared/AuthButton/AuthButton";
import AuthLogo from "../../Shared/AuthLogo/AuthLogo";
import AuthTitle from "../../Shared/AuthTitle/AuthTitle";
import styles from './ResetPassword.module.css';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function ResetPassword() {

  const showPass = () => {
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (passwordInput?.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const showConfPass = () => {
    const confirmPassInput = document.getElementById("confirmPassword") as HTMLInputElement;
    if (confirmPassInput?.type === "password") {
      confirmPassInput.type = "text";
    } else {
      confirmPassInput.type = "password";
    }
  };

  let { register, formState: { errors }, handleSubmit } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Reset', data);
      console.log(response);

      navigate('/reset-password');
      toast.success("Otp sent successfully", {
        theme: "light",
      });

    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);

    }
  }


  return (
    <>
      <div className={styles.forgetPass}>
        <div className="w-50">
          <div className="d-flex justify-content-center">
            <AuthLogo />
          </div>
          <div className={`p-5 ${styles.forgetPassContent}`}>
            <AuthTitle title={'Reset Password'} />

            <form onSubmit={handleSubmit(onSubmit)} className="authForm px-4 mt-4">
              <div className="input-group mb-1">
                <label htmlFor="email">E-mail</label>
                <input {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address.'
                  }
                })}
                  type="email" placeholder="Enter your E-mail" aria-label="email" aria-describedby="basic-addon1" />
              </div>

              {errors.email && <span className="bg-danger px-2 rounded-2 my-2 text-white mb-1">{String(errors.email.message)}</span>}


              <div className="input-group mb-1">
                <label htmlFor="email">OTP Verification</label>
                <input {...register('seed', {
                  required: 'Otp is required',
                  pattern: {
                    value: /^[A-Za-z0-9]{4,8}$/,
                    message: 'OTP must be 4 to 8 characters long and contain only letters and numbers.'
                  }
                })}
                  type="text" id="seed" placeholder="Enter Verification" aria-label="seed" aria-describedby="basic-addon2" />
              </div>
              {errors.seed && <span className="bg-danger px-2 rounded-2 my-2 text-white mb-1">{String(errors.seed.message)}</span>}

              <div className="input-group mb-1">
                <label htmlFor="email">New Password</label>
                <input {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must be at least 8 characters and include at least one number and one special character (@, #, $, etc.).'
                  }
                })}
                  type="password" id="password" placeholder="Enter your New Password" aria-label="password" aria-describedby="basic-addon2" />
                
              </div>
              {errors.password && <span className="bg-danger px-2 rounded-2 my-2 text-white mb-1">{String(errors.password.message)}</span>}

              <div className="input-group mb-1">
                <label htmlFor="email">Confirm Password</label>
                <input {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    pattern: {
                      value: /^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: 'Passwords do not match. Please enter the same password.'
                    }
                  })}
                  type="password" id="confirmPassword" placeholder="Confirm New Password" aria-label="confirmPassword" aria-describedby="basic-addon2" />
                </div>
                {errors.confirmPassword && <span className="bg-danger px-2 rounded-2 my-2 text-white mb-1">{String(errors.confirmPassword.message)}</span>}



              <AuthButton title='Save' />

            </form>

          </div>
        </div>
      </div>
    </>
  );
}
