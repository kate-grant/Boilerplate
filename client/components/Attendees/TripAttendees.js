import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getCookie } from "../../redux/users";
import {
  updateThisUserTrip,
  deleteThisUserTrip,
} from "../../redux/tripReducer";
import Searchbar from "./Searchbar";

const TripAttendees = (props) => {
  const { tripId } = useParams();
  const usersOnTrip = useSelector((state) => state.trips.singleTripView.Users);
  const [userId, setUserId] = useState("");
  const [userTripInfo, setUserTripInfo] = useState({
    role: "",
    UserId: "",
    TripId: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (userId !== "") {
      props.updateThisUserTrip(parseInt(tripId), { ...userTripInfo });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [userTripInfo]);

  const handleAccess = (event) => {
    setUserTripInfo({
      role: event.target.value,
      UserId: parseInt(userId),
      TripId: tripId,
    });
  };

  const handleDelete = (e, userId) => {
    console.log("delete in attendees", tripId);
    e.stopPropagation();
    props.deleteThisUserTrip(tripId, userId);
  };

  const idOfUserLoggedIn = getCookie("userId");

  const userHasPermissions = usersOnTrip.filter((user) => {
    if (user.id == idOfUserLoggedIn) {
      if (user.user_trip.role === "owner" || user.user_trip.role === "editor") {
        return user;
      }
    }
  });

  return (
    <div
      style={{
        width: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "2rem",
        borderRadius: "5px",
        boxShadow: "2px 1px 20px grey",
        margin: "2rem auto",
        background: 'white'
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <h3 style={{ flex: 5, width: "fit-contents" }}>Trip Attendees</h3>
        {userHasPermissions.length ? <Searchbar /> : null}
      </div>
      <div
        style={{
          display: "flex",
          width: "auto",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "none",
          justifyContent: "center",
        }}
      >
        <DragDropContext>
          {!usersOnTrip ? (
            <h6 className="loading">There are no attendees on this trip yet</h6>
          ) : (
            <div
              style={{
                width: "100%",
                height: "22.5rem",
                overflowY: "scroll",
                flexDirection: "row",
                flexWrap: "wrap",
                padding: "0.3rem",
                borderRadius: "5px",
                boxShadow: "2px 1px 20px grey",
                margin: "0.3rem auto",
                background: '#e3dcef'
              }}
            >
              {usersOnTrip.map((user) => {
                return (
                  <Card
                    key={user.id}
                    style={{
                      width: "auto",
                      margin: "1rem",
                      height: "70px",
                      boxShadow: "0px 1px 1px grey",
                      padding: "none",
                      background: '#f5f1f9'
                    }}
                  >
                    <Card.Body
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "none",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {user.firstName} {user.lastName}
                      </strong>
                      {userHasPermissions.length ? (
                        <section>
                          {user.user_trip.role === "owner" ? (
                            <h6
                              style={{
                                float: "right",
                                fontSize: "14px",
                              }}
                            >
                              Trip Owner
                            </h6>
                          ) : (
                            <section>
                              <Button
                                onClick={(e) => handleDelete(e, user.id)}
                                variant="outline-danger"
                                style={{
                                  height: "35px",
                                  marginLeft: "10px",
                                  float: "right",
                                  position: "float",
                                  padding: "0.5rem",
                                  fontSize: "12px",
                                }}
                              >
                                Delete
                              </Button>
                              <Form.Select
                                defaultValue={user.user_trip.role}
                                onChange={handleAccess}
                                onClick={() => {
                                  setUserId(user.id);
                                }}
                                style={{
                                  width: "150px",
                                  height: "35px",
                                  boxShadow: "0px 1px 1px grey",
                                  padding: "0.5rem",
                                  float: "right",
                                  fontSize: "12px",
                                  background: '#f5f1f9'
                                }}
                              >
                                <option value="attendee">Attendee</option>
                                <option value="editor">Editor</option>
                                <option value="owner">Owner</option>
                              </Form.Select>
                              {user.id === userId
                                ? showSuccess && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="25"
                                      height="25"
                                      fill="green"
                                      className="bi bi-check-lg"
                                      viewBox="0 0 16 16"
                                      style={{
                                        margin: "0.3rem",
                                        marginRight: "1rem",
                                      }}
                                    >
                                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                    </svg>
                                  )
                                : null}
                            </section>
                          )}
                        </section>
                      ) : null}
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          )}
        </DragDropContext>
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    trips: state.trips,
  };
};

const mapDispatch = (dispatch) => ({
  updateThisUserTrip: (tripId, userTrip) =>
    dispatch(updateThisUserTrip(tripId, userTrip)),
  deleteThisUserTrip: (tripId, userId) =>
    dispatch(deleteThisUserTrip(tripId, userId)),
});

export default connect(mapState, mapDispatch)(TripAttendees);
