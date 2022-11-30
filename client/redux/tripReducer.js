import axios from "axios";
//action types
const GET_ALL_COMPLETED_TRIP = "GET_ALL_COMPLETED_TRIP";
const GET_ALL_ACTIVE_TRIP = "GET_ALL_ACTIVE_TRIPS";
const CREATE_TRIP = "CREATE_TRIP";

//action creator
const getAllCompletedTrips = (trips) => {
  return {
    type: GET_ALL_COMPLETED_TRIP,
    trips,
  };
};

const getAllActiveTrips = (activeTrips) => {
  return {
    type: GET_ALL_ACTIVE_TRIP,
    activeTrips,
  };
};

const createTrip = (trip) => {
  return {
    type: CREATE_TRIP,
    trip,
  };
};

//thunk creator

export const getAllCompletedTripsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/completedTrips/${userId}`
      );
      dispatch(getAllCompletedTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllActiveTripsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/activeTrips/${userId}`
      );
      dispatch(getAllActiveTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNewTrip = (trip) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/trips`, trip);
      dispatch(createTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { active: [], complete: [] };

// reducer
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPLETED_TRIP:
      return { ...state, complete: action.trips };
    case GET_ALL_ACTIVE_TRIP:
      return { ...state, active: action.activeTrips };
    case CREATE_TRIP:
      return { ...state, active: action.trip };
    default:
      return state;
  }
}

/*
initial
active: []

when there are no actives
active: []

when there are actives
active: [{ object 1}]



*/
