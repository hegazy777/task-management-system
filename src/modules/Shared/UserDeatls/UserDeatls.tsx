import { Modal } from "react-bootstrap"
import { User } from "../../../services/UserListInterFaces/InterFace"
// import styls from "./UserDeatls.module.css"


export default function UserDeatls({ userDeatls, show, handleClose, Loader }: { userDeatls: User|null , show: boolean; handleClose: () => void; handleShow: () => void; Loader: boolean }) {
    console.log(userDeatls)



    return (





        <>

            {Loader ?    <Modal> <span className="vh-100 bg-black d-flex justify-content-center align-items-center"> LOad..</span> </Modal>  : <Modal centered
                show={show} onHide={handleClose} animation={false}>
                <Modal.Body className="text-center">

                    <h3>UserName : <span className="h4">{userDeatls?.userName}</span></h3>
                    <h3>Email : <span className="h4">{userDeatls?.email}</span></h3>
                    <h3>country : <span className="h4">{userDeatls?.country}</span></h3>
                    <h3>Status :    {userDeatls?.isActivated ? <span className="bg-success p-1 h5 text-white rounded-3 "> active</span> : <span className="bg-danger p-1 h5 text-white rounded-3 "> NotActive</span>}    </h3>
                    <h3>phoneNumber :   <span className="h5">{userDeatls?.phoneNumber}</span>  </h3>
                    <h3>Role :   <span className="h5">{userDeatls?.group.name}</span>  </h3>
                </Modal.Body>

            </Modal>}

        </>


    )
}
