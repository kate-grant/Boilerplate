import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Button, Card } from "react-bootstrap";
import TaskCard from "./TaskComponents/TaskCard";
import AddNewTaskModal from "./TaskComponents/AddNewTaskModal";
import { getCookie } from "../redux/users";

function dueDateCompare(a, b) {
  return new Date(a.due_date) - new Date(b.due_date);
}

const TripTaskTodo = (props) => {
  const idOfUserLoggedIn = getCookie("userId");

  const userLoggedInRelationshipToTrip = props.trip.Users.filter((user) => {
    if (user.id == idOfUserLoggedIn) {
      if (user.user_trip.role !== "attendee") {
        return user;
      }
    }
  });

  const dispatch = useDispatch();
  // const { tripId } = useParams();
  const { trip } = props;
  const tasks = useSelector((state) => state.tasks.allItineraryTasks);
  const [todo, setTodo] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  //const trip = useSelector((state) => state.trip.singleTrip);

  useEffect(() => {
    // SORTING TASKS BY DUE DATE
    const todoTasks = tasks.filter((task) => task.status === "in progress");
    todoTasks.sort(dueDateCompare);
    setTodo(todoTasks);
  }, [tasks]);

  return (
    <div
      style={{
        width: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "2rem",
        borderRadius: "5px",
        boxShadow: "2px 1px 20px grey",
        marginTop: "3rem",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <h3 style={{ flex: 5, width: "fit-contents" }}>In Progress</h3>
        {/* conditional render here to allow only editors and owners to add a new task to trip */}
        {userLoggedInRelationshipToTrip.length ? (
          <Button
            variant="primary"
            style={{
              flex: 1,
              width: "fit-contents",
              float: "right",
              marginRight: "1rem",
            }}
            onClick={() => setModalShow(true)}
          >
            Add New Task
          </Button>
        ) : (
          <h1></h1>
        )}
      </div>
      <Card>
        {todo.map((task, i) => {
          return (
            <TaskCard
              key={i}
              task={task}
              type="todo"
              style={{ width: "100%" }}
              trip={props.trip.Users}
            />
          );
        })}
      </Card>
      <AddNewTaskModal
        trip={trip ? trip.id : null}
        show={modalShow}
        onHide={() => setModalShow(false)}
        tasks={tasks}
      />
    </div>
  );
};
export default connect(null)(TripTaskTodo);
