import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddTitle from "../Shared/AddTitle/AddTitle";
import styles from "./AllTasks.module.css";
import { faEdit, faEllipsis, faEyeSlash, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useEffect, useState } from "react";
import { Dropdown, Table } from "react-bootstrap";
import { privateApiInstance } from "../../services/api/apiInstance";
import { tasks_endpoints } from "../../services/api/apiConfig";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Pagination from "../Shared/Pagination/Pagination";
import DeleteConfirmation from "../Shared/DeleteConfirmation/DeleteConfirmation";
import { useNavigate } from "react-router-dom";

type taskType = {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    manager: ManagerType;
};

type ManagerType = {
    id: number;
    userName: string;
    imagePath: string;
};


function AllTasks() {

    const navigate = useNavigate();
    // handle fetch logic
    const [tasksList, setTasksList] = useState<taskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
    const [{ title }, setQuery] = useState({
        title: "",
    });

    const getAllTasks = async (
        pageSize: number,
        pageNumber: number,
        title: string
    ) => {
        try {
            const response = await privateApiInstance.get(
                tasks_endpoints.GET_ALL_TASKS,
                {
                    params: {
                        pageNumber,
                        pageSize,
                        title,
                    },
                }
            );

            setTotalNumberOfPages(response.data.totalNumberOfPages);
            setTotalNumberOfRecords(response.data.totalNumberOfRecords);
            console.log(response?.data.data);
            setTasksList(
                response?.data?.data?.map((task: taskType) => {
                    return {
                        ...task,
                        creationDate: new Date(task.creationDate).toLocaleDateString(),
                        modificationDate: new Date(task.modificationDate).toLocaleDateString(),
                    };
                })
            );
            setLoading(false);
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error(axiosError?.response?.data?.message);
        }
    };

    useEffect(() => {
        getAllTasks(pageSize, currentPageNumber, title);
    }, [currentPageNumber, title, pageSize]);

    // handle delete category logic
    const deleteCategory = async (selectedId: number) => {
        try {
            await privateApiInstance.delete(
                tasks_endpoints.DELETE_TASK(selectedId)
            );
            toast.success("Item is deleted successfully");
            getAllTasks(10, currentPageNumber, title);
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            toast.error(axiosError?.response?.data?.message);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleShow = (id: number) => {
        setShowModal(true);
        setSelectedId(id);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedId(null);
    };

    const handleCloseAndDelete = (id: number | null) => {
        handleClose();
        if (id) deleteCategory(id);
    };


    const getValues = (e: ChangeEvent<HTMLFormElement>) => {
        setQuery((prev) => {
            return {
                ...prev,
                [e?.target?.name]: e?.target?.value,
            };
        });
    };

    return (
        <div className={styles.allTasks}>
            <AddTitle title="Tasks" btnTitle="Add New Task" />
            <div className="py-3 px-5">
                <div className={`p-3 ${styles.tasksContainer}`}>
                    <form className="py-3" onChange={getValues}>
                        <div className="form-group row">
                            <div className="col-md-4">
                                <div className={`${styles.inputGroup} input-group`}>
                                    <div className="input-group-prepend">
                                        <span
                                            className="input-group-text bg-transparent"
                                            id="search-addon"
                                        >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </span>
                                    </div>
                                    <input
                                        name="title"
                                        className={`${styles.input} form-control`}
                                        type="text"
                                        placeholder="Search"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <Table striped hover className={styles.table}>
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Manager</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Modification Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>

                        {loading ? (
                            <tbody className="text-center">
                                <tr>
                                    <td colSpan={6} className="">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {tasksList.length === 0 ? (
                                    <tr>
                                        <td colSpan={7}>
                                            no data
                                            {/* <NoData /> */}
                                        </td>
                                    </tr>
                                ) : (
                                    tasksList.map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            {/* <td>{project.manager.userName}</td> */}
                                            <td>{task.creationDate}</td>
                                            <td>{task.creationDate}</td>
                                            <td>{task.modificationDate}</td>

                                            <td>
                                                <Dropdown align="end">
                                                    <Dropdown.Toggle
                                                        id="dropdown-basic"
                                                        icon={faEllipsis}
                                                        className="test-success m-2"
                                                        as={FontAwesomeIcon}
                                                    />

                                                    <Dropdown.Menu variant="secondary">
                                                        <Dropdown.Item className={styles.dropdownItem}>
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    className={styles.dropdownIcon}
                                                                    icon={faEyeSlash}
                                                                />
                                                                <span>View</span>
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className={styles.dropdownItem}>
                                                            <div
                                                                onClick={() => navigate(`${task.id}/edit`)}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faEdit}
                                                                    className={styles.dropdownIcon}
                                                                />
                                                                <span>Edit</span>
                                                            </div>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item className={styles.dropdownItem}>
                                                            <div onClick={() => handleShow(task.id)}>
                                                                <FontAwesomeIcon
                                                                    icon={faTrash}
                                                                    className={styles.dropdownIcon}
                                                                />
                                                                <span>Delete</span>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        )}
                    </Table>

                    <Pagination
                        currentPage={currentPageNumber}
                        changeCurrentPage={setCurrentPageNumber}
                        totalNumberOfPages={totalNumberOfPages}
                        totalNumberOfRecords={totalNumberOfRecords}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />

                    <DeleteConfirmation
                        item="Project"
                        show={showModal}
                        handleClose={handleClose}
                        handleCloseAndDelete={() => handleCloseAndDelete(selectedId)}
                    />
                </div>
            </div>
        </div>
    )
}

export default AllTasks
