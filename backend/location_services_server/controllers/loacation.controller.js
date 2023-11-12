// inrixController.js
import axios from "axios";
import { getToken } from "../middleware/inrixMiddleware.js";

// Function to find a route using the Inrix API
const findRoute = async (wp_1, wp_2) => {
  try {
    const wp_1 = "37.770581,-122.442550";
    const wp_2 = "37.765297,-122.442527";
    // Get the Inrix API token using the middleware
    console.log("Finding route...");
    const apiKey = await getToken();
    // Set up URL to query for finding a route
    const routeUrl = `https://api.iq.inrix.com/findRoute?wp_1=${wp_1}&wp_2=${wp_2}&format=json`;
    console.log("routeURL: ", routeUrl);

    // Set up query method for finding a route
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    // Query INRIX for finding a route using the obtained API token
    const response = await fetch(routeUrl, requestOptions);
    const routeData = await response.json();
    var data = {
      data: routeData,
    };
    return data;
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: error.message });
    throw new Error("Failed to find route using Inrix API");
  }
};

const findTime = async (req, res) => {
  try {
    // Call mongoDb service to get wp_1 and wp_2
    const wp_1 = "37.770581,-122.442550";
    const wp_2 = "37.765297,-122.442527";

    // Get route data using the findRoute function
    const routeData = await findRoute(wp_1, wp_2);

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
      });
    } else {
      // Handle the case when no route data is available
      res.status(404).json({ code: 0, msg: "No route data available" });
    }
  } catch (error) {
    console.error(error);
    // Handle the error as needed
    res.status(500).json({ message: "Internal Server Error" });
  }
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
export { test, findTime };
