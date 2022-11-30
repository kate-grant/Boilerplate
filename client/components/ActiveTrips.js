import React, { useEffect } from "react";
import { getAllActiveTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";


const ActiveTrips = (props) => {
  useEffect(() => {
    props.getTrips();
  }, []);

  const { trips } = props;
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate(`/trip/${event.target.name}`);
  };

  /*
trups.active = []
trips.active[0] = undefined
undefined.length 
*/

  return (
    <div>
      <h1>Current Trips</h1>
      <div>
        {trips.active.length == 0 ? (
          <h4>No active Trips</h4>
        ) : (
          trips.active.map((singleTrip) => {
            return (
              <div key={singleTrip.id}>
                <Card
                  className="mb-4"
                  style={{ width: "18rem" }}
                  key={singleTrip.id}
                >
                  <Card.Img variant="top" src={singleTrip.imageUrl} />
                  <Card.Body>
                    <Card.Title>{singleTrip.name}</Card.Title>
                    <Card.Text>Status: {singleTrip.status}</Card.Text>
                    <Card.Text>
                      Dates: {singleTrip.start_date.slice(5, 7)}/
                      {singleTrip.start_date.slice(8, 10)}/
                      {singleTrip.start_date.slice(0, 4)} -{" "}
                      {singleTrip.end_date.slice(5, 7)}/
                      {singleTrip.end_date.slice(8, 10)}/
                      {singleTrip.start_date.slice(0, 4)}
                    </Card.Text>
                    <Button
                      name={singleTrip.id}
                      onClick={handleClick}
                      variant="primary"
                    >
                      View Trip
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrips: () => {
      dispatch(getAllActiveTripsThunk());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrips);
//   export default ActiveTrips
