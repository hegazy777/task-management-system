import styles from './AuthTitle.module.css';

function AuthTitle({ title }: { title: string }) {
    return (
        <div className={`px-4 ${styles.authTitle}`}>
            <p className="m-0 mb-1 p-0">welcome to PMS</p>
            <h2 className='fs-1 m-0 p-0'>{title}</h2>
            <span></span>
        </div>
    )
}

export default AuthTitle
