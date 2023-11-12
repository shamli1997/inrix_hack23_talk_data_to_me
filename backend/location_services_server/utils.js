// Function to find the midpoint between two coordinates using Haversine formula
import axios from "axios";
import { getToken } from "./middleware/inrixMiddleware.js";
import properties from "./config.json" assert { type: "json" };

async function getLatLong(type) {
  var data = [];
  const url = `${
    properties.http + properties.backend_port + properties.backend_api + type
  }`;
  console.log(url);
  await axios({
    method: "get",
    url:
      properties.http +
      properties.backend_port +
      properties.backend_api +
      `${type}`,
  })
    .then(function (response) {
      console.log("RESPONSE: ", response.data);
      data = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
}

function getMidpoint(coord1, coord2) {
  const lat1 = parseFloat(coord1.split(",")[0]);
  const lon1 = parseFloat(coord1.split(",")[1]);
  const lat2 = parseFloat(coord2.split(",")[0]);
  const lon2 = parseFloat(coord2.split(",")[1]);

  const dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  const dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  const lat1Rad = (lat1 * Math.PI) / 180.0;
  const lat2Rad = (lat2 * Math.PI) / 180.0;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const midLat = (lat1 + lat2) / 2;
  const midLon = (lon1 + lon2) / 2;
  const result = [];
  result.push(midLat);
  result.push(midLon);

  return result;
}
// Function to find a route using the Inrix API
const findRoute = async () => {
  try {
    var home_location = "home";
    var work_location = "work";

    const wp_1 = await getLatLong(home_location);
    const wp_2 = await getLatLong(work_location);
    var waypoint1 = `${wp_1[0]},${wp_1[1]}`;
    var waypoint2 = `${wp_2[0]},${wp_2[1]}`;
    // Get the Inrix API token using the middleware
    console.log("Finding route...");
    const apiKey = await getToken();
    // Set up URL to query for finding a route
    const routeUrl = `https://api.iq.inrix.com/findRoute?wp_1=${waypoint1}&wp_2=${waypoint2}&format=json`;
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
    throw new Error("Failed to find route using Inrix API");
  }
};

const findSpots = async () => {
  try {
    // Get the Inrix API token using the middleware
    console.log("Finding Parking Spots...");
    const apiKey = await getToken();
    var work_location = "work";

    const other_location = "other";
    const wp_1 = await getLatLong(other_location);
    var waypoint1 = `${wp_1[0]}|${wp_1[1]}`;
    // Format coordinates properly by replacing '|' with ','
    const formattedCoords = waypoint1.replace("|", "%7C");
    // Set up URL to query for finding a route
    const routeUrl = `https://api.iq.inrix.com/blocks/v3?point=${formattedCoords}&radius=100&format=json`;
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
    const spotsData = await response.json();
    var data = {
      data: spotsData,
    };
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to find parking spots using Inrix API");
  }
};
export { findRoute, getMidpoint, findSpots, getLatLong };
