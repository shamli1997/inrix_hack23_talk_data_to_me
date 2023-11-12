// inrixMiddleware.js
import fetch from "node-fetch";

// Function to get the Inrix API token
export const getToken = async () => {
  try {
    // Set up URL to query for the Inrix API token
    let appId = "jsdba1qpz5";
    let hashToken =
      "anNkYmExcXB6NXxkNURyamVoSUpDOVdhQTlGaThWbFY1b0YycVZWeFBYaDZNeEx5eXFr";
    let tokenUrl = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;

    // Set up query method for the Inrix API token
    const requestOptions = {
      method: "GET",
    };

    // Query INRIX for the token
    const response = await fetch(tokenUrl, requestOptions);
    const json = await response.json();
    const inrixApiKey = json.result.token;

    return inrixApiKey;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Inrix API token");
  }
};
