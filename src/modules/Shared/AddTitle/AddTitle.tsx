import { Link } from 'react-router-dom';
import styles from './AddTitle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddTitle({ title, btnTitle }: { title: string; btnTitle: string }) {
    return (
        <div className={`${styles.addTitle} py-3 px-5`}>
            <h2>{title}</h2>
            <Link to={'/dashboard/new-task'} className={styles.add}>
                <FontAwesomeIcon icon={faPlus} />
                <span>{btnTitle}</span>
            </Link>
        </div>
    );
}

export default AddTitle
