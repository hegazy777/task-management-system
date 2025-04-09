import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import AuthTitle from "../../Shared/AuthTitle/AuthTitle";

import styles from "./VerifyAccount.module.css"
import { verfiVerfication } from './../../../services/vaildators';
import { apiInstance } from "../../../services/api/apiInstance";
import { users_endpoints } from './../../../services/api/apiConfig';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";


export default function VerifyAccount() {
  const navigate = useNavigate()
  let loction = useLocation()
  console.log(loction.state)
  interface userData {
    email: string,
    code: string,

  }
  const { formState: { errors, isSubmitted }, register, handleSubmit } = useForm({ defaultValues: { email: loction?.state } })

  function sendData(data: userData): void {
    console.log(data)
    apiInstance.put(users_endpoints.VERIFY, data).then((res) => {


      toast.success(res?.data?.message)

      navigate("/login")
    }).catch((res) => {


      toast.error(res?.response?.data.message)
    })

  }
  return <>

    <div className={`${styles.verfiyContainer} p-lg-4  rounded-3 p-2`}>
      <div className="container-md">
        <AuthTitle title="Verify Account" />
        <form onSubmit={handleSubmit(sendData)} className="p-4" >


          <div className='my-1'>
            <label htmlFor="userEmail" className={styles.lableStyle}>E-mail</label>
            <br />
            <input
              {...register(`email`,)}
              value={loction.state}
              disabled

              type="email" placeholder='Enter your E-mail' className={`${styles.inputStyle}  w-100`} id="userEmail" />
          </div>

          <div className='my-3'>
            <label htmlFor="userOtp" className={styles.lableStyle}>OTP Verification</label>
            <br />
            <input
              {...register(`code`, verfiVerfication)}

              type="tel" placeholder='Enter Verification' className={`${styles.inputStyle}  w-100`} id="userOtp" />
            {errors.code && <span className="text-danger">{errors.code.message}</span>}
          </div>
          <div className='text-center'>            <button disabled={isSubmitted} className={`${styles.btnMainColor} btn   w-50 mt-2 mt-md-3 rounded-5 text-white `}>  {isSubmitted ? <FontAwesomeIcon
            icon={faCircleNotch}
            size="2x"
            color="white"
          />
            : <span>save</span>}</button>
          </div>
        </form>
      </div>

    </div>



  </>;
}
