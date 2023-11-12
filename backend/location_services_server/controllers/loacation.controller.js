// inrixController.js
import axios from "axios";
import { response } from "express";
import { findRoute, getMidpoint, findSpots, getLatLong } from "../utils.js";

const findTime = async (req, res) => {
  try {
    // Get route data using the findRoute function
    const routeData = await findRoute();

    // Check if routeData is available
    if (
      routeData &&
      routeData.data &&
      routeData.data.result &&
      routeData.data.result.trip &&
      routeData.data.result.trip.routes &&
      routeData.data.result.trip.routes.length > 0
    ) {
      // Extract travel time for the first route
      const travelTimeMinutes =
        routeData.data.result.trip.routes[0].travelTimeMinutes;

      // Send the travel time as the API response
      res.json({
        code: 1,
        msg: `It takes ${travelTimeMinutes} mins to reach home`,
        time: travelTimeMinutes,
      });
    } else {
      // Handle the case when no route data is available
      res.status(404).json({
        code: 0,
        msg: "I’m sorry. I could not find the time to get back home",
      });
    }
  } catch (error) {
    console.error(error);
    // Handle the error as needed
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findParkingSpots = async (req, res) => {
  // Call mongoDb service to get wp_1 and wp_2
  const grocery_cords = "37.74304518280319|-122.42438793182373";
  const parkingData = await findSpots(grocery_cords);
  console.log(parkingData);
  const parkingSpot = parkingData.data.result[0];
  const probability = parkingSpot ? parkingSpot.probability : null;
  if (probability !== null && probability >= 0 && probability <= 100) {
    res.json({
      code: 1,
      msg: `The probability of getting a parking spot when you reach ${parkingSpot.name} is ${probability}%.`,
    });
  } else {
    res.json({
      code: 1,
      msg: "Unable to determine the probability of getting a parking spot.",
    });
  }
  // Send the travel time as the API response
};

const getMidPoint = async (req, res) => {
  const wp_1 = await getLatLong("home");
  const wp_2 = await getLatLong("work");
  var waypoint1 = `${wp_1[0]},${wp_1[1]}`;
  var waypoint2 = `${wp_2[0]},${wp_2[1]}`;
  const midPoints = await getMidpoint(waypoint1, waypoint2);

  res.send(midPoints);
};

const test = async (req, res) => {
  try {
    var response = {
      code: 1,
      msg: "Hello from Shamli's Server",
    };
    res.send(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { test, findTime, findParkingSpots, getMidPoint };
