import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup
} from "reactstrap";
import React, { useState, useEffect, useRef } from "react";
import { Task } from "../sdk/task.sdk.js";
import { useNavigate } from "react-router-dom";


export default (props) => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [modalAddTask, setModalAddTask] = useState(false);
  const toggleModalAddTask = () => {
    setModalAddTask(!modalAddTask);
    setTaskTitle("");
  };

  const [error, setError] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskLocation, setTaskLocation] = useState("");
  const [taskHour, setTaskHour] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const res = await Task.getAllTasksByUser(
        localStorage.getItem("apiToken"),
        JSON.parse(localStorage.getItem("user"))._id
      );
      if (res.success) {
        setTasks(res.tasks);
      }
    }
    fetchTasks();
  }, []);

  async function handleDelete(id) {
    const res = await Task.deleteTask(localStorage.getItem("apiToken"), id);
    if (res.success) {
      navigate(0);
    }
  }

  async function handleEdit(id, title, active) {
    const res = await Task.updateTask(
      localStorage.getItem("apiToken"),
      id,
      title,
      active
    );
    if (res.success) {
      const newTasks = tasks.map((task) => {
        if (task._id === id) {
          task.title = title;
          task.active = active;
        }
        return task;
      });
      setTasks(newTasks);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!taskTitle) {
      setError("Title is mandatory");
      return;
    }
    const res = await Task.createTask(
      localStorage.getItem("apiToken"),
      taskTitle,
      taskLocation,
      taskHour,

      JSON.parse(localStorage.getItem("user"))._id
    );
    if (res.success) {
      setTasks([...tasks, res.task]);
      setTaskTitle("");
      toggleModalAddTask();
    }
  }

  return (
    <>
      <Modal isOpen={modalAddTask} toggle={toggleModalAddTask}>
        <ModalHeader toggle={toggleModalAddTask}>Add new weather schedule</ModalHeader>
        <form>
          <ModalBody>
            <span className="text-danger">{error}</span>
            <div className="mb-3">
              <label>Phone number</label>
              <Input
                className="form-control"
                placeholder="#number"
                type="#number"
                autoComplete="#number"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <label>City name</label>
              <Input
                className="form-control"
                placeholder="Bucharest"
                type="Location"
                autoComplete="Location"
                value={taskLocation}
                onChange={(e) => setTaskLocation(e.target.value)}
              />
              <label>Hour and minute</label>
              <Input
                className="form-control"
                placeholder="hh:mm"
                type="hh:mm"
                autoComplete="hh:mm"
                value={taskHour}
                onChange={(e) => setTaskHour(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => handleAdd(e)} type="submit">
              Add
            </Button>
            <Button color="secondary" onClick={toggleModalAddTask}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <Container className="mt-2">
			<Card className="p-4 mt-2">

        <Row className="mt-2">
          <Col sm="11">
              <h3>All Weather Schedules</h3>

              <Row>
                <Col sm="12">
                  {tasks.map((task) => (
                    <div key={task._id} className="mb-3">
                      <p className="mb-0">
                        <span className="h5">{task.title}</span> -{" "}
                        {task.active ? "Active" : "Not Active"}-{" "}
                        {task.location} -{" "}
                        {task.hour}
                      </p>
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          color="danger"
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete Schedule
                        </Button>
                        <Button
                          color="primary"
                          onClick={() =>
                            handleEdit(task._id, task.title, !task.active)
                          }
                        >
                          {task.active ? "Deactivate" : "Activate"}
                        </Button>
                      </ButtonGroup>
                    </div>
                  ))}
                </Col>

                <Col sm="3" className="mt-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      toggleModalAddTask();
                    }}
                  >
                    Add Weather Schedule
                  </Button>
                </Col>
              </Row>
          </Col>
          <Col sm="1" className="text-right">
            <Button
              color="primary"
              onClick={() => {
                localStorage.removeItem("apiToken");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Col>
        </Row>
				</Card>

      </Container>
    </>
  );
};
