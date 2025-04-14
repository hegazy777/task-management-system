import { faEllipsisVertical, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import { User } from "../../../services/UserListInterFaces/InterFace";




export default function ({ blockedUser, userActivty, userId, blockUser, getUserDeatls, handleShow, }: { blockedUser: User | null, userActivty: boolean, userId: number, blockUser: (id: number) => void, getUserDeatls: (id: number) => void, handleShow: () => void }) {

  // console.log("blockedUser?.isActivated " + blockedUser?.isActivated)
  // console.log("userActivty " + userActivty)



  return (
    <Dropdown>
      <Dropdown.Toggle className="ed border-0" variant="white" id="">
        <span id="dropdown-basic2">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => blockUser(userId)}>
          {userActivty || blockedUser?.isActivated ? <span>Block</span> : <span> Active</span>}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            getUserDeatls(userId);
            handleShow();
          }}
        >
          <FontAwesomeIcon icon={faEye} /> View
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>)
}
