import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import {
  BsGraphUp,
  BsClipboardCheck,
  BsDiagram3,
  BsPersonCheck,
  BsPersonX,
} from "react-icons/bs";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function Dashboard() {
  const [taskCount, setTaskCount] = useState(null);
  const [taskProgress, setTaskProgress] = useState(null);
  const [activeUsers, setActiveUsers] = useState(null);
  const [inactiveUsers, setInactiveUsers] = useState(null);

  // Register required Chart.js components
  ChartJS.register(ArcElement, Tooltip, Legend);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchTaskData = async () => {
      try {
        const response = await axios.get(
          "https://upskilling-egypt.com:3003/api/v1/Task/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTaskCount(response.data.toDo);
        setTaskProgress(response.data.inProgress);
      } catch (error) {
        console.error("Error fetching task count:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "https://upskilling-egypt.com:3003/api/v1/Users/count",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response", response);
        setActiveUsers(response.data.activatedEmployeeCount);
        setInactiveUsers(response.data.deactivatedEmployeeCount);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchTaskData();
    fetchUserData();
  }, []);

  const userData = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [3, 5], // Default to 0 if data is not yet loaded
        backgroundColor: ["#36A2EB", "#FF6384"], // Blue for active, Red for inactive
        hoverBackgroundColor: ["#2A8DD1", "#D9534F"],
      },
    ],
  };

  return (
    <>
      <div className="p-3">
        <div
          className="relative bg-cover bg-center d-flex flex-column justify-content-center px-4 text-white"
          style={{
            backgroundImage: "url('../src/assets/home-bg.png')",
            height: "312px",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          <h1 className="text-2xl font-light p-3">
            Welcome <span className="text-warning fw-semibold">Upskilling</span>
          </h1>
          <p className="text-lg p-3">
            You can add projects and assign tasks to your team
          </p>
        </div>

        <div className="row py-2">
          <div className="col-md-6">
            <Card className="shadow-sm p-4 ">
              <Card.Title>Tasks</Card.Title>
              <Card.Text>Manage your tasks efficiently</Card.Text>
              <div className="d-flex gap-3 mt-3">
                <div className="text-center bg-light p-3 rounded flex-grow-1">
                  <BsGraphUp size={25} className="mb-2" />
                  <p className="small m-0">Progress</p>
                  <p className="fw-bold fs-4">{taskProgress ?? "Loading..."}</p>
                </div>
                <div className="text-center bg-warning bg-opacity-25 p-3 rounded flex-grow-1">
                  <BsClipboardCheck size={25} className="mb-2" />
                  <p className="small m-0">Tasks</p>
                  <p className="fw-bold fs-4">{taskCount ?? "Loading..."}</p>
                </div>
                <div className="text-center bg-danger bg-opacity-25 p-3 rounded flex-grow-1">
                  <BsDiagram3 size={25} className="mb-2" />
                  <p className="small m-0">Projects</p>
                  <p className="fw-bold fs-4">32</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-md-6">
            <Card className="shadow-sm p-4 ">
              <Card.Title>Users</Card.Title>
              <Card.Text>Check user activity</Card.Text>
              <div className="d-flex gap-3 mt-3">
                <div className="text-center bg-light p-3 rounded flex-grow-1">
                  <BsPersonCheck size={25} className="mb-2" />
                  <p className="small m-0">Active</p>
                  <p className="fw-bold fs-4">{activeUsers ?? "Loading..."}</p>
                </div>
                <div className="text-center bg-danger bg-opacity-25 p-3 rounded flex-grow-1">
                  <BsPersonX size={25} className="mb-2" />
                  <p className="small m-0">Inactive</p>
                  <p className="fw-bold fs-4">{inactiveUsers ?? "Loading..."}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="row justify-content-start mt-4">
            <div className="col-md-6">
              <Card className="shadow-sm p-4">
                <h4 className="text-center">User Statistics</h4>
                <div style={{ width: "300px", margin: "0 auto" }}>
                  <Doughnut data={userData} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
