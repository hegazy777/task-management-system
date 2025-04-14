import { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// import DeleteConfirmation from "../../Shared/Modal/DeleteConfirmation";
import {
  faSearch,
  faEllipsis,
  faTrash,
  faEdit,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { projects_endpoints } from "../../../services/api/apiConfig";
import { privateApiInstance } from "../../../services/api/apiInstance";
import { AxiosError } from "axios";
import Pagination from "../../Shared/Pagination/Pagination";
import { Dropdown, Stack, Table } from "react-bootstrap";
import styles from "./ProjectsList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "../../../interfaces/interfaces";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ProjectsList() {
  const { isManager } = useContext(AuthContext);
  const navigate = useNavigate();
  // handle fetch logic
  const [projectsList, setProjectList] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

  const [{ title }, setQuery] = useState({
    title: "",
  });
  const getAllProjects = async (
    pageSize: number,
    pageNumber: number,
    title: string
  ) => {
    try {
      const response = await privateApiInstance.get(
        isManager
          ? projects_endpoints.GET_ALL_PROJECTS_MANAGER
          : projects_endpoints.GET_ALL_PROJECTS_EMPLOYEE,
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
      // console.log(response?.data);
      setProjectList(
        //map items to remove sensetive data that is coming with this api call
        response?.data?.data
      );

      setLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllProjects(pageSize, currentPageNumber, title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageNumber, title, pageSize]);

  // handle delete category logic
  const deleteCategory = async (selectedId: number) => {
    try {
      await privateApiInstance.delete(
        projects_endpoints.DELETE_PROJECT(selectedId)
      );
      toast.success("Item is deleted successfully");
      getAllProjects(10, currentPageNumber, title);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(axiosError?.response?.data?.message);
    }
  };
  // confirmation model before delete
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
    <div className={styles.overlayBg} style={{width:"100%"}}>
      <Stack
        gap={3}
        direction="horizontal"
        className={`${styles.Header} px-5 d-flex justify-content-between align-items-center bg-white`}
      >
        <div className="caption">
          <h3>Projects</h3>
        </div>

        {isManager && (
          <button className={styles.addBtn} onClick={() => navigate("new")}>
            Add New Project
          </button>
        )}
      </Stack>

      <div className="p-5">
        <div className={styles.containerBg}>
          <div className="container-fluid">
            <form onChange={getValues}>
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
          </div>
          <Table striped hover className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">NumTasks</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Modification Date</th>

                {isManager && <th scope="col">Actions</th>}
              </tr>
            </thead>

            {loading ? (
              <tbody className="text-center">
                <tr>
                  <td colSpan={isManager ? 5 : 6} className="">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {projectsList.length === 0 ? (
                  <tr>
                    <td colSpan={isManager ? 7 : 6}>
                      No Data
                      {/* <NoData /> */}
                    </td>
                  </tr>
                ) : (
                  projectsList.map((project) => (
                    <tr key={project.id}>
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                      <td>{project.task?.length}</td>
                      <td>{project.creationDate}</td>
                      <td>{project.modificationDate}</td>
                      {isManager && (
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
                                    icon={faEye}
                                  />
                                  <span>View</span>
                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item className={styles.dropdownItem}>
                                <div
                                  onClick={() => navigate(`${project.id}/edit`)}
                                >
                                  <FontAwesomeIcon
                                    icon={faEdit}
                                    className={styles.dropdownIcon}
                                  />
                                  <span>Edit</span>
                                </div>
                              </Dropdown.Item>
                              <Dropdown.Item className={styles.dropdownItem}>
                                <div onClick={() => handleShow(project.id)}>
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
                      )}
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
  );
}
