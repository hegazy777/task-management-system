import AddTitle from "../Shared/AddTitle/AddTitle";
import styles from "./AllTasks.module.css";


function AllTasks() {
    return (
        <div className={styles.allTasks}>
            <AddTitle title="Tasks" btnTitle="Add New Task" />
            <div className="py-3 px-5">
                <div className={`p-3 ${styles.tasksContainer}`}>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead className={styles.tableHeader}>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Statues</th>
                                    <th scope="col">Num Users</th>
                                    <th scope="col">Num Tasks</th>
                                    <th scope="col">Data Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllTasks
