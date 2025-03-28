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
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        title
      )}
    </button>
  );
}

export default AuthButton;
