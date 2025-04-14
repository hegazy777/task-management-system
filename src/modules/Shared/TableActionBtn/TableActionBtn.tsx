import { faEllipsisVertical, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

export default function ({  userId, blockUser, getUserDeatls, handleShow }: {  userId:number, blockUser: (id:number)=> void  , getUserDeatls: (id:number)=> void, handleShow: () => void }) {
  
  return (
    <Dropdown>
      <Dropdown.Toggle className="ed border-0" variant="white" id="">
        <span id="dropdown-basic2">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => blockUser(userId)}>
          Block
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
