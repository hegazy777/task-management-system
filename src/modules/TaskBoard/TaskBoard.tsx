import { useEffect, useState } from "react";
import styles from "./TaskBoard.module.css";
import axios from "axios";
import { Task, TaskResponse, TaskStatus } from "../../interfaces/TaskBoard";
import { toast } from 'react-toastify';
export default function TaskBoard() {


  const [tasks, setTasks] = useState<Task[]>([]);





  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get<TaskResponse>(
        "https://upskilling-egypt.com:3003/api/v1/Task",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
    const token = localStorage.getItem("token");
  
    try {
      await axios.put(
        `https://upskilling-egypt.com:3003/api/v1/Task/${taskId}/change-status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) =>prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
        
      );
      toast.success('Task status updated successfully!');
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const todoTasks = tasks.filter((task) => task.status === "ToDo");
  const inProgressTasks = tasks.filter((task) => task.status === "InProgress");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Board</h1>
      <div className={styles.columns}>
        <Column title="ToDo" tasks={todoTasks} onDropTask={updateTaskStatus}  />
        <Column title="InProgress" tasks={inProgressTasks} onDropTask={updateTaskStatus}  />
        <Column title="Done" tasks={doneTasks} onDropTask={updateTaskStatus}  />
      </div>
    </div>
  );
}

function Column({title,tasks,onDropTask}: { title: TaskStatus;tasks: Task[];onDropTask: (taskId: number, newStatus: TaskStatus) => void;}) 
{
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = Number(e.dataTransfer.getData("taskId"));
    onDropTask(taskId, title);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); 
  };

  return (
    <div
      className={styles.column}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className={styles.columnTitle}>{title}</h2>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={styles.taskCard}
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("taskId", task.id.toString())
          }
        >
          <h4>{task.title}</h4>
        </div>
      ))}
    </div>
  );
}
