import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser } from "../redux/users";

const SingleUser = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  const user = useSelector((state) => state.users);

  const firstName = user.firstName || "";

  return (
    <div className="container">
      <main>
        {user.length == 0 && (
          <h3 className=" error"> User does not exist in the system!</h3>
        )}
        <h2> Hello {firstName}</h2>
        <h3>Here are your upcoming trips: </h3>
        <h3>Here are your tasks: </h3>
      </main>
    </div>
  );
};
export default connect(null)(SingleUser);