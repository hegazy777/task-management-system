import { Spinner } from "react-bootstrap";
import styles from "./AuthButton.module.css";

function AuthButton({
  title,
  isSubmitting,
}: {
  title: string;
  isSubmitting: boolean;
}) {
  return (
    // <button className={styles.authBtn}>{title}</button>

    <button type="submit" className={styles.authBtn} disabled={isSubmitting}>
      {isSubmitting ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        title
      )}
    </button>
  );
}

export default AuthButton;
