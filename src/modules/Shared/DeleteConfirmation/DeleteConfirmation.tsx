import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./DeleteConfirmation.module.css";
export default function DeleteConfirmation({item,show,handleClose,handleCloseAndDelete,}: {item: string;show: boolean;handleClose: () => void;handleCloseAndDelete: () => void;}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <FontAwesomeIcon
        icon={faCircleXmark}
        onClick={handleClose}
        className={`${styles.closeIcon}`}
      />

      <Modal.Body className="text-center">
        <h5>Delete This {item} ?</h5>
        <p>Are you sure you want to delete this item ?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outline-danger" onClick={handleCloseAndDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
