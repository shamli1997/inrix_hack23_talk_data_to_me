const yelp = require('yelp-fusion');
const client = yelp.client('i-Jz2Duc7NSGGdND-OvCrbknVyyI94BgpfGA2TGBVOAGRkT_9atR6eXNAreav1A4tXMzBo_pXXgphuKWFUH07_ctGj1hS3DpI296o_ULLsPDa_8H4nZA9T8to-ZPZXYx');

const {google} = require('googleapis');

var express = require('express');
const axios = require("axios");
const router = express.Router();
const cors = require('cors');


var app = express();
app.use(cors()); /* NEW */


console.log("started server")
app.get('/', function (req, res) {
    res.send("This is the suggest backend");
});
app.get('/calendar', function (req, res) {
  const API_KEY = 'AIzaSyCpsWS3t-EpUBU3WPPA9494WdwzT6FG3i8';
  const url = 'https://www.googleapis.com/calendar/v3/calendars/c_df2bf29d0852cced3a6745a36aacfebab2b2ed91fcab71cea1aa6c3279981590@group.calendar.google.com/events?key=';


  axios.get(url+API_KEY).then(data => {
    var retStr = "";
    data.data.items.forEach(ele => {
    options = {
      weekday: 'long',hour:"numeric",minute:"numeric"
    };
      var startTime = (ele["start"]["dateTime"] === undefined ? ele["start"]["date"]:ele["start"]["dateTime"])
      startTime = new Date(startTime).toLocaleString('en-US', options)

      var endTime = (ele["end"]["dateTime"] === undefined ? ele["end"]["date"]:ele["end"]["dateTime"])
      endTime = new Date(endTime).toLocaleString('en-US', options)


      retStr += "You said "+ele.summary + " from " + startTime + " to " + endTime +"."
    });
    //console.log(data.data.items)
    res.send(JSON.stringify({
      code: 0,
      msg: retStr
    }));
  })
})

app.get('/food', async function (req, res) {
  axios.get("http://localhost:4001/location/midpoint").then((data) => {
  client.search({
    term: 'boba',
    latitude: data["data"][0],
    longitude: data["data"][1],
    sort_by: 'best_match',
    limit: '4',
    radius: '3000'
  }).then(response => {
    var retStr = ""
    if(response.jsonBody.total > 0){
      //res.send(JSON.stringify(response.jsonBody));
      response.jsonBody.businesses.forEach(ele => {
        retStr += ele.name + " is around " + Math.floor(ele.distance) + " meters away. " 
        //location is possible
      });
      
      res.send(JSON.stringify({
        code: 0,
        msg: retStr
      }));
    } else{
      res.send(JSON.stringify({
        code: 0,
        msg: "Error. There are no places like"
      }))
    }
  }).catch(e => {
    res.send("Error");
  });

})})

app.listen(3001);
