import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTasksByTrip } from "../redux/taskReducer";
import { fetchSingleTrip } from "../redux/tripReducer";
import TripTasks from "./TripTasks";
import TripTaskTodo from "./TripTaskTodo";
import EditTrip from "./EditTrip";
import { getCookie } from "../redux/users";

const SingleTrip = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();

  useEffect(() => {
    dispatch(getTasksByTrip(tripId));
  }, []);

  useEffect(() => {
    dispatch(fetchSingleTrip(tripId));
  }, [trip]);

  const trip = useSelector((state) => state.trips.singleTripView);
  const singleTrip = trip?.singleTrip;
  if (!singleTrip) return null;

  const idOfUserLoggedIn = getCookie("userId");
  const allUsersInTrip = singleTrip.Users;

  // ensures that that user logged in is owner if so they can edit trip 
  const userLoggedInRelationshipToTrip = singleTrip.Users.filter((user) => {
    if (user.id == idOfUserLoggedIn) {
      if (user.user_trip.role == "owner") {
        return user;
      }
    }
  });

  // const onlyOwnersAndEditors = singleTrip.Users.filter((user) => {
  //   return user.user_trip.role == "owner" || "editor";
  // });

  // const onlyOwners = singleTrip.Users.filter((user) => {
  //   return user.user_trip.role == "owner";
  // });

  return (
    <div>
      <div
        className="container"
        style={{ width: "100%", alignContent: "center" }}
      >
        <main>
          <h1>{trip.singleTrip.name}</h1>

          {userLoggedInRelationshipToTrip.length ? (
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
              <h3>Edit This Trip</h3>
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
                <EditTrip />
                {/* {userLoggedInRelationshipToTrip.length ? <EditTrip /> : <h1></h1>} */}
              </div>
            </div>
          ) : (
            <h1></h1>
          )}

          <TripTasks trip={trip["singleTrip"]} />
          <TripTaskTodo trip={trip["singleTrip"]} />
        </main>
      </div>
    </div>
  );
};

export default connect(null)(SingleTrip);
