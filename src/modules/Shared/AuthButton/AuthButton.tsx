import styles from './AuthButton.module.css';

function AuthButton({ title }: { title: string }) {
  return (
    <button className={styles.authBtn}>{title}</button>
  )
}

export default AuthButton
