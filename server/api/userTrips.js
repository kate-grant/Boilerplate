const userTripsRouter = require("express").Router();
const {
    models: { User, User_Trip },
  } = require("../../db/index");
const Sequelize = require("sequelize");

//GET ROUTE
//get all users on a single trip
userTripsRouter.get("/:tripId", async (req, res, next) => {
  try {
    const findAllUsersOnTrip = await User_Trip.findAll({
      where: { TripId: req.params.tripId },
    });

    const allUsersOnTrip = await Promise.all(
        findAllUsersOnTrip.map(async (user) => {
          return await User.findOne({
            where: {
              id: user.UserId,
            },
          });
        })
      );

    res.send(allUsersOnTrip).status(200);
  } catch (error) {
    next(error);
  }
});

//POST ROUTE
//add new user trip
userTripsRouter.post("/", async (req, res, next) => {
  try {
    const createUserTrip = await User_Trip.create(req.body);
    res.status(200).send(createUserTrip);
  } catch (error) {
    next(error);
  }
});

module.exports = userTripsRouter;
