import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container } from "react-bootstrap";
import { BsGraphUp, BsClipboardCheck, BsDiagram3, BsPersonCheck, BsPersonX } from "react-icons/bs";

export default function Dashboard() {
  const [taskCount, setTaskCount] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    const fetchData = async () => {
      try {
        const response = await axios.get('https://upskilling-egypt.com:3003/api/v1/Task/count', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        });
        console.log(response);
        setTaskCount(response.data.toDo); 
      } catch (error) {
        console.error("Error fetching task count:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="p-0">
      <div
        className="relative bg-cover bg-center d-flex flex-column justify-content-center px-4 text-white"
        style={{
          backgroundImage: "url('../src/assets/home-bg.png')",
          height: "312px",
        }}
      >
        <h1 className="text-2xl font-light p-3">
          Welcome <span className="text-warning fw-semibold">Upskilling</span>
        </h1>
        <p className="text-lg p-3">
          You can add projects and assign tasks to your team
        </p>
      </div>

      <Container className="py-4">
        <div className="d-flex flex-wrap gap-4">
          <Card className="shadow-sm p-4 flex-grow-1">
            <Card.Title>Tasks</Card.Title>
            <Card.Text>Lorem ipsum dolor sit amet, consectetur</Card.Text>
            <div className="d-flex gap-3 mt-3">
              <div className="text-center bg-light p-3 rounded flex-grow-1 d-flex flex-column align-items-center">
                <BsGraphUp size={25} className="mb-2" />
                <p className="small m-0">Progress</p>
                <p className="fw-bold fs-4">$ 7328.32</p>
              </div>
              <div className="text-center bg-warning bg-opacity-25 p-3 rounded flex-grow-1 d-flex flex-column align-items-center">
                <BsClipboardCheck size={25} className="mb-2" />
                <p className="small m-0">Tasks Number</p>
                <p className="fw-bold fs-4">{taskCount !== null ? taskCount : "Loading..."}</p>
              </div>
              <div className="text-center bg-danger bg-opacity-25 p-3 rounded flex-grow-1 d-flex flex-column align-items-center">
                <BsDiagram3 size={25} className="mb-2" />
                <p className="small m-0">Projects Number</p>
                <p className="fw-bold fs-4">32</p>
              </div>
            </div>
          </Card>

          <Card className="shadow-sm p-4 flex-grow-1">
            <Card.Title>Users</Card.Title>
            <Card.Text>Lorem ipsum dolor sit amet, consectetur</Card.Text>
            <div className="d-flex gap-3 mt-3">
              <div className="text-center bg-light p-3 rounded flex-grow-1 d-flex flex-column align-items-center">
                <BsPersonCheck size={25} className="mb-2" />
                <p className="small m-0">Active</p>
                <p className="fw-bold fs-4">$ 7328.32</p>
              </div>
              <div className="text-center bg-warning bg-opacity-25 p-3 rounded flex-grow-1 d-flex flex-column align-items-center">
                <BsPersonX size={25} className="mb-2" />
                <p className="small m-0">Inactive</p>
                <p className="fw-bold fs-4">1293</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Container>
  );
}
