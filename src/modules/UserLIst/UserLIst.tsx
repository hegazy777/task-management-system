import { faArrowDown, faArrowLeft, faArrowRight, faEllipsisVertical, faFilter, faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./UserLIst.css"
import { Dropdown, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { users_endpoints } from './../../services/api/apiConfig';
import { privateApiInstance } from "../../services/api/apiInstance";
import DateObject from "react-date-object";

export default function UserLIst() {



    const [getUsers, setGetUsers] = useState(null)
    const [getPageNumber, setPageNumber] = useState(1)

    function getEmployee(pageNum: number) {
        privateApiInstance.get(users_endpoints.GET_ALL_USERS(pageNum)
        ).then((res) => {
            console.log(res.data)
            setGetUsers(res?.data)
            setPageNumber(res?.data.pageNumber)
        }).catch((res) => {
            console.log(res)

        }).finally(() => {

        })

    }
    useEffect(() => {

        getEmployee(getPageNumber)
    }, [])

    interface data {
        id: number,
        userName: string,
        email: string | number,
        country: | string,
        phoneNumber: number,
        isActivated: boolean,
        creationDate: number
    }

    function prevPage() {


        let getNumberOfPrevPage = getPageNumber - 1
        console.log(getNumberOfPrevPage)
        getEmployee(getNumberOfPrevPage)
        setPageNumber(getNumberOfPrevPage)

        if (getNumberOfPrevPage == 1 || getNumberOfPrevPage == 0 ||getNumberOfPrevPage == -1
        ) {
            getEmployee(getUsers?.totalNumberOfPages)
            setPageNumber(getUsers?.totalNumberOfPages)

        }
    }
    function nextPage() {
        let getNumberOfNextPage;
        console.log("S")
        if (getPageNumber < getUsers.totalNumberOfPages) {
            getNumberOfNextPage = getPageNumber + 1
            getEmployee(getNumberOfNextPage)
            setPageNumber(getNumberOfNextPage)
            console.log(getNumberOfNextPage)
            console.log("SS")
        }
        else if (getPageNumber == getUsers.totalNumberOfPages) {
            setPageNumber(1)
            getEmployee(1)
            console.log("==")
        }
    }

    return (
        <>
            <div className=" bg-custom w-custom ">
                <div>  <div className="title p-4 bg-white  ">
                    <h1>Users</h1>
                </div>



                </div>


                <div>




                    <div className="bg-custom   ">
                        <div className="p-4">



                            <div className="table-content bg-white rounded-2  py-3 shadow">
                                <div className="fitration&Searsh     ">
                                    <div className="row g-0 mb-3 p-2  justify-content-start">



                                        <div className="  col-xl-2 col-lg-3  col-md-5   mb-2 mb-md-0 ">       <div className=" position-relative ">
                                            <input type="text" className="edit-search" placeholder="Search Fleets" id="icon" />

                                            <label htmlFor="icon"><FontAwesomeIcon icon={faSearch} className="position-absolute handelSearhIcon" color="gray" />
                                            </label>

                                        </div></div>
                                        <div className=" col-xl-2  col-lg-3 col-md-5   "><div className="btnContainer">                                <Dropdown>
                                            <Dropdown.Toggle className="ed" variant="white" id="">
                                                <span id="dropdown-basic"> <FontAwesomeIcon icon={faFilter} /> filter</span>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>


                                        </div></div>
                                    </div>

                                    <div className="table-responsive">
                                        <Table responsive="sm ">
                                            <thead className="position-sticky  top-1">
                                                <tr className="text-center">
                                                    <th>User Name <FontAwesomeIcon icon={faSort} /> </th>
                                                    <th>Statues <FontAwesomeIcon icon={faSort} /> </th>
                                                    <th>Phone Number <FontAwesomeIcon icon={faSort} /> </th>
                                                    <th >Email <FontAwesomeIcon icon={faSort} /> </th>
                                                    <th>Date Created <FontAwesomeIcon icon={faSort} /> </th>
                                                    <th>Action  </th>

                                                </tr>
                                            </thead>
                                            <tbody>

                                                {getUsers?.data.map((user: data) => {
                                                    let date = new DateObject(user.creationDate);

                                                    return <tr key={user.id} className="text-center  ">
                                                        <td className="p-3">{user.userName}</td>
                                                        <td className="p-3">
                                                            <span className={user.isActivated ? ` bg-success rounded-4 p-1  px-3 text-white` : ` bg-danger rounded-4 p-1  px-3 text-white`}>

                                                                active
                                                            </span>                                                </td>
                                                        <td className="p-3">{user.phoneNumber}</td>
                                                        <td className="p-3">{user.email}</td>
                                                        <td className="p-3">{date.format()}</td>
                                                        <td className="p-3">  <FontAwesomeIcon icon={faEllipsisVertical} /></td>

                                                    </tr>

                                                })}


                                            </tbody>
                                        </Table>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-lg-end  align-items-baseline mt-2 py-2 ">   <span >showing </span>


                                    <div className=" border  rounded-5 ms-md-2 px-md-3 p-md-1">                                            <span id="dropdown-basic" className="d-inline-flex justify-content-center align-items-center p-2 p-md-0 ">  10 <FontAwesomeIcon icon={faArrowDown} className="ms-1" /> </span>
                                    </div>




                                    <span className="mx-2 me-4">of {getUsers?.totalNumberOfRecords} Result</span>

                                    <div className="text-center"> Page {getPageNumber} of {getUsers?.totalNumberOfPages} <FontAwesomeIcon onClick={prevPage} className="cursor-pointer" icon={faArrowLeft} /> <FontAwesomeIcon onClick={nextPage} className="mx-2 cursor-pointer" icon={faArrowRight} />  </div>
                                </div>
                            </div>


                        </div>



                    </div>



                </div>


            </div>




        </>
    )
}
