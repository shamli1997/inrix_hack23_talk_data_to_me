app.get("/gettoken", async function (req, res) {
  //Set up URL to query
  let appId = "jsdba1qpz5";
  let hashToken =
    "anNkYmExcXB6NXxkNURyamVoSUpDOVdhQTlGaThWbFY1b0YycVZWeFBYaDZNeEx5eXFr";
  let url = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;

  //Set up query method
  var requestOptions = {
    method: "GET",
  };

  //Query INRIX for token
  let response = await fetch(url, requestOptions);
  let json = await response.json();
  let output = json.result.token;

  //Return token
  res.json({
    token: output,
  });
});
