import { useForm } from "react-hook-form";
import styles from "./Tasks.module.css";
import leftArrow from "../../assets/leftArrow.svg";
import { privateApiInstance } from "../../services/api/apiInstance";
import { users_endpoints } from "../../services/api/apiConfig";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type DataType = {
  id: string,
  title: "string",
  description: "string",
  employeeId: string,
  projectId: string,
  userName: string,
};

function Tasks() {
  const [users, setUsers] = useState<DataType[]>([]);
  const [projects, setProjects] = useState<DataType[]>([]);

  useEffect(() => {
    getUsers();
    getProjects();
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DataType>();

  const getUsers = async () => {
    try {
      const response = await privateApiInstance.get(users_endpoints.GET_ALL_USERS(1));
      setUsers(response.data.data);
    }
    catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  const getProjects = async () => {
    try {
      const response = await privateApiInstance.get('https://upskilling-egypt.com:3003/api/v1/Project/?pageSize=10&pageNumber=1');
      setProjects(response.data.data);
    }
    catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };

  const onSubmit = async (data: DataType) => {
    try {
      const response = await privateApiInstance.post('https://upskilling-egypt.com:3003/api/v1/Task', data);
      toast.success('Task added successfully!');
      reset();
      console.log(response.data);
      
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };


  return (
    <div className={styles.tasks}>
      <div className={`py-3 px-5 ${styles.title}`}>
        <div className="d-flex align-items-center gap-2">
          <img src={leftArrow} alt="left arrow" />
          <Link to={'/dashboard/all-tasks'} className={styles.viewBtn}>View All Tasks</Link>
        </div>
        <h3 className="">Add a New Task</h3>
      </div>

      <div className={`d-flex justify-content-center p-4 ${styles.addTask}`}>
        <form onSubmit={handleSubmit(onSubmit)} className={`w-75 py-4 px-5 ${styles.form}`}>

          <div className="input-grou mb-1">
            <p className="p-0 m-0 mb-2">Title</p>
            <input {...register("title")} type="string" placeholder="Name" aria-label="basic-addon1" aria-describedby="basic-addon1" />
          </div>
          {errors.title && (<div className="pb-3 text-danger">{String(errors.title.message)} </div>)}

          <div className="input-grou mt-4 mb-1">
            <p className="p-0 m-0 mb-2">Description</p>
            <textarea {...register("description")} placeholder="Description" aria-label="basic-addon1" aria-describedby="basic-addon1" />
          </div>
          {errors.description && (<div className="pb-3 text-danger">{String(errors.description.message)} </div>)}


          <div className="d-flex justiftcontent-between gap-4 align-items center">
            <div className="input-grou mb-1 mt-4 w-50">
              <p className="p-0 m-0 mb-2">User</p>
              <select {...register("employeeId")} aria-label="employeeId" aria-describedby="basic-addon1" className="w-100">
                <option value="">No Users Selected</option>
                {users?.map?.((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userName}
                  </option>
                ))}
              </select>
            </div>
            {errors.employeeId && (<div className="pb-3 text-danger">{String(errors.employeeId.message)} </div>)}

            <div className="input-grou mb-1 mt-4 w-50">
              <p className="p-0 m-0 mb-2">Project</p>
              <select {...register("projectId")} aria-label="projectId" aria-describedby="basic-addon1" className="w-100">
                <option value="">No Status Selected</option>
                {projects?.map?.((project) => (
                  <option key={project.id} value={project.id}>
                    {project.description}
                  </option>
                ))}
              </select>
            </div>
            {errors.projectId && (<div className="pb-3 text-danger">{String(errors.projectId.message)} </div>)}
          </div>

          <hr />

          <div className="btns d-flex justify-content-between mt-4">
            <button className={styles.cancelBtn} type="reset">Cancel</button>
            <button className={styles.saveBtn} type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tasks
