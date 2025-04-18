import { Button, Spinner, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { tasks_endpoints } from "../../services/api/apiConfig";
import { privateApiInstance } from "../../services/api/apiInstance";
import { AuthContext } from "../../contexts/AuthContext";
import { projectDataSehemaValidation } from "../../services/vaildators";
import { ProjectTypeForm } from "../../interfaces/interfaces";
import styles from "./TaskData.module.css";

function TaskData() {

    const { isManager } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const onNavigate = () => {
        navigate("/dashboard/all-tasks");
    };
    const [{ title, description }, setProjectData] = useState({
        title: "",
        description: "",
    });
    const getProjectData = async (id: number) => {
        const response = await privateApiInstance.get(
            tasks_endpoints.GET_TASK(id)
        );
        setProjectData({
            title: response.data.title,
            description: response.data.description,
        });
    };

    useEffect(() => {
        if (params.id) {
            getProjectData(Number(params.id));
        }
    }, [params.id]);
    const {
        register,
        // reset,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm({
        mode: "onChange",
        values: {
            title,
            description,
        },
        resolver: yupResolver(projectDataSehemaValidation),
    });

    const onSubmit = async (Data: ProjectTypeForm) => {
        try {
            if (params.id) {
                await privateApiInstance.put(
                    tasks_endpoints.UPDATE_TASK(Number(params.id)),
                    Data
                );
                toast.success("Task is edited successfully");
                console.log(Data);
                
            } else {
                await privateApiInstance.post(tasks_endpoints.ADD_TASK, Data, {});
                console.log(Data);
                toast.success("Task is added successfully");
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error(axiosError?.response?.data?.message);
            console.log(error);
            
        } finally {
            onNavigate();
        }
    };
    if (!isManager) navigate("dashboard");

    return (
        <div className={styles.overlayBg}>
            <Stack
                gap={3}
                direction="horizontal"
                className={`${styles.Header} px-5 d-flex justify-content-between align-items-center bg-white`}
            >
                <div className="caption">
                    <Link
                        to="/dashboard/all-tasks/"
                        className="link-secondary link-offset-2 text-decoration-none"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                        View All Tasks
                    </Link>

                    <h3>{params.id ? "Edit Task" : "Add New Task"}</h3>
                </div>
            </Stack>
            <div className="p-5">
                <div className={styles.containerBg}>
                    <form
                        className="container p-4"
                        role="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* <img className="w-50 my-5" src={ModalImg} /> */}
                        <div className="pb-4">
                            <label className="form-label" htmlFor="title">
                                Title
                            </label>
                            <div className="input-group mb-3">
                                <input
                                    {...register("title")}
                                    type="text"
                                    className="form-control"
                                    placeholder="Task Title"
                                />
                            </div>
                            {errors.title && (
                                <div className="pb-3 text-danger">{errors.title.message}</div>
                            )}
                        </div>
                        <div className="pb-4">
                            <label className="form-label" htmlFor="description">
                                Description
                            </label>
                            <div className="input-group mb-3">
                                <textarea
                                    {...register("description")}
                                    className="form-control"
                                    placeholder="Task Description"
                                />
                            </div>
                            {errors.description && (
                                <div className="pb-3 text-danger">
                                    {errors.description.message}
                                </div>
                            )}
                        </div>
                        <div className="d-flex justify-content-between">
                            <Button
                                variant="outline-secondary"
                                className="rounded-5"
                                onClick={() => onNavigate()}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="outline-secondary"
                                className="rounded-5"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskData
