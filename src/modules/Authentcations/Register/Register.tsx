import AuthTitle from './../../Shared/AuthTitle/AuthTitle';
import styles from "./Regester.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { apiInstance } from '../../../services/api/apiInstance';
import { users_endpoints } from './../../../services/api/apiConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { countryVerfication, emailVefication, passwValidation } from '../../../services/vaildators';
import { userNameValidation, phoneNumberVefication } from './../../../services/vaildators';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import usePasswordHook from '../../../Hooks/usePasswordHook';
import { userData } from '../../Shared/AuthInterfaces/InterFace';


export default function Register() {
  
  const navigate = useNavigate()

     let {changeTogle,changeTogle2,eyeTogel,eyeTogel2}=  usePasswordHook()


  const { formState: { errors, isSubmitted }, register, trigger, watch, handleSubmit } = useForm({ mode: `all` })

  function sendRegisterData(data: userData): void {
    console.log(data)
    apiInstance.post(users_endpoints.REGISTER, data).then((res) => {
      toast.success(res.data.message)
      navigate("/verify-account", { state: data.email })

    }).catch((res) => {
      toast.error(res.
        response
        .data.message)
    })
  }
  const password = watch("password")
  const confirmPassword = watch("confirmPassword")
  useEffect(() => {

    if (confirmPassword) {
      trigger("confirmPassword")
    }
  }, [trigger, confirmPassword, password])

  return <>


    <div className={`${styles.rigesterConntainer} rounded-4  p-lg-5 p-1 `}>

      <div className=' container-md'>
        <AuthTitle title={"Create New Account"} />
        <form
          onSubmit={handleSubmit(sendRegisterData)}>
          <div className='row p-lg-4   '>

            <div className='col-lg-6  '>
              <div className='my-1'>
                <label htmlFor="userName" className={styles.lableStyle}>User Name</label>
                <br />
                <input
                  {
                  ...register(`userName`, userNameValidation)
                  }


                  type="text" placeholder='Enter your name' className={`${styles.inputStyle}  w-100`} id="userName" />

                {errors.userName && <span className='text-danger'>{errors.userName.message}</span>}
              </div>
            </div>
            <div className='col-lg-6'>

              <div className='my-1'>
                <label htmlFor="userEmail"  className={styles.lableStyle}>E-mail</label>
                <br />
                <input
                  {...register(`email`, emailVefication)}

                  type="email" placeholder='Enter your E-mail' className={`${styles.inputStyle}  w-100`} id="userEmail" />
                {errors.email && <span className='text-danger'>{errors.email.message}</span>}
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='my-1'>    <label htmlFor="userCountry"  className={styles.lableStyle}>Country</label>
                <br />
                <input
                  {...register(`country`, countryVerfication)}


                  type="text" placeholder='Enter your country' className={`${styles.inputStyle}  w-100`} id="userCountry" />
                {
                  errors.country && <span className='text-danger'>{errors.country.message}</span>
                }

              </div>

            </div>
            <div className='col-lg-6'>
              <div className='my-1'>
                <label htmlFor="userPhone"  className={styles.lableStyle}>Phone Number</label>
                <br />
                <input
                  {...register(`phoneNumber`, phoneNumberVefication)}


                  type="tel" placeholder='Enter your phone number' className={`${styles.inputStyle}  w-100`} id="userPhone" />
                {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='my-1 position-relative'>   <label htmlFor="userPass"  className={styles.lableStyle}>Password</label>
                <br />
                <input
                  {...register(`password`, passwValidation)}


                  type={eyeTogel2 ? `text` : `password`} placeholder='Enter your Password'className={`${styles.inputStyle}  w-100`} id="userPass" />
                <span
                  onClick={changeTogle2} className={`${styles.handleEye} position-absolute  ` }>
                  <FontAwesomeIcon
                    color="white"
                    icon={eyeTogel2 ? faEye : faEyeSlash}
                  />

                </span>
                {errors.password && <span className='text-danger'>{errors.password.message}</span>}

              </div>
            </div>
            <div className='col-lg-6'>
              <div className='position-relative'>
                <label htmlFor="userConfirm"  className={styles.lableStyle}>Confirm Password</label>
                <br />
                <input

                  {...register(`confirmPassword`, {
                    required: " confirmPassword is requird",
                    pattern: {
                      value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                      message: `Minimum eight characters and add some of #?!@$%^&*._-`,
                    },
                    validate: (confirmPassword) => confirmPassword === watch("password") || `confirmPassword not match the pasword`
                  })} type={eyeTogel ? `text` : `password`} placeholder='Confirm New Password' className={`${styles.inputStyle}  mt-1 w-100`} id="userConfirm" />

                <span onClick={changeTogle} className={`${styles.handleEye} position-absolute  ` }>
                  <FontAwesomeIcon
                    color="white"
                    icon={eyeTogel ? faEye : faEyeSlash}
                  />

                </span>
                {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

              </div> </div>
            <div className='text-center'>            <button disabled={isSubmitted} className={`${styles.btnMainColor} btn  w-50 mt-2 mt-md-3 rounded-5 text-white `}>  {isSubmitted ? <FontAwesomeIcon
              icon={faCircleNotch}
              size="2x"
              color="white" />
              : <span>save</span>}</button>
            </div>        </div>
        </form>

      </div>

    </div>

  </>;
}
