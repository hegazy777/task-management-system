import { useForm } from "react-hook-form";
import styles from "./Tasks.module.css";
import leftArrow from "../../assets/leftArrow.svg";

type DataType = {
  title: "string",
  description: "string",
  employeeId: string,
  projectId: string,
};

function Tasks() {

  const { register, formState: { errors } } = useForm();

  return (
    <div className={styles.tasks}>
      <div className={`py-3 px-5 ${styles.title}`}>
        <div className="d-flex align-items-center gap-2">
          <img src={leftArrow} alt="left arrow" />
          <p className="p-0 m-0">View All Tasks</p>
        </div>
        <h3 className="">Add a New Task</h3>
      </div>

      <div className={`d-flex justify-content-center p-4 ${styles.addTask}`}>
        <form action="" className={`w-75 py-4 px-5 ${styles.form}`}>

          <div className="input-grou mb-1">
            <p className="p-0 m-0 mb-2">Title</p>
            <input {...register("title")} type="string" placeholder="Name" aria-label="basic-addon1" aria-describedby="basic-addon1" />
          </div>
          {errors.email && (<div className="pb-3 text-danger">{String(errors.email.message)} </div>)}

          <div className="input-grou mt-4 mb-1">
            <p className="p-0 m-0 mb-2">Description</p>
            <textarea {...register("description")} placeholder="Description" aria-label="basic-addon1" aria-describedby="basic-addon1" />
          </div>
          {errors.email && (<div className="pb-3 text-danger">{String(errors.email.message)} </div>)}


          <div className="d-flex justiftcontent-between gap-4 align-items center">
            <div className="input-grou mb-1 mt-4 w-50">
              <p className="p-0 m-0 mb-2">User</p>
              <select {...register("employeeId")} aria-label="employeeId" aria-describedby="basic-addon1" className="w-100">
                <option value="">No Users Selected</option>
              </select>
            </div>
            {errors.email && (<div className="pb-3 text-danger">{String(errors.email.message)} </div>)}

            <div className="input-grou mb-1 mt-4 w-50">
              <p className="p-0 m-0 mb-2">Project</p>
              <select {...register("projectId")} aria-label="projectId" aria-describedby="basic-addon1" className="w-100">
                <option value="">No Status Selected</option>
              </select>
            </div>
            {errors.email && (<div className="pb-3 text-danger">{String(errors.email.message)} </div>)}
          </div>

          <hr />

          <div className="btns d-flex justify-content-between mt-4">
            <button className={styles.cancelBtn} type="button">Cancel</button>
            <button className={styles.saveBtn} type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tasks
