import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { getTasksByUser, deleteTask } from "../../../redux/taskReducer";
import TaskModal from "./TaskModal";
// ^ to link to a specific trip in trip dashboard

const TasksInProgress = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setShow(false);
    dispatch(deleteTask(id));
  };

  const [show, setShow] = useState(false);

  const tasks = props.tasks.allItineraryTasks || [];
  let inProgressTasks = tasks.filter((task) => task.status === "in progress");

  return (
    <div>
      <h3>Current Tasks</h3>
      <div>
        {inProgressTasks.length == 0 ? (
          <h2>No past tasks</h2>
        ) : (
          inProgressTasks.map((singleTask) => {
            return (
              <Card
                className="mb-4"
                style={{ width: "40rem" }}
                key={singleTask.id}
              >
                <Card.Body>
                  <Alert show={show} variant="danger">
                    <Alert.Heading>
                      Are you sure you want to delete this task?
                    </Alert.Heading>
                    <p>
                      To delete, press the delete button. To cancel request,
                      press cancel.
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => setShow(false)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={(e) => handleDelete(e, singleTask.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </Alert>

                  {!show && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => setShow(true)}
                    >
                      Delete
                    </Button>
                  )}
                  <Card.Title>{singleTask.type} </Card.Title>
                  <Card.Text>Trip: {singleTask.Trip.name}</Card.Text>
                  <Card.Text>Task Due Date: {singleTask.due_date}</Card.Text>
                  <Card.Text>
                    Provider Name: {singleTask.provider_name}
                  </Card.Text>
                  <TaskModal singleTask={singleTask} />
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps)(TasksInProgress);
