const yelp = require('yelp-fusion');
const client = yelp.client('i-Jz2Duc7NSGGdND-OvCrbknVyyI94BgpfGA2TGBVOAGRkT_9atR6eXNAreav1A4tXMzBo_pXXgphuKWFUH07_ctGj1hS3DpI296o_ULLsPDa_8H4nZA9T8to-ZPZXYx');

const {google} = require('googleapis');

var express = require('express');

var app = express();


app.get('/', function (req, res) {
    res.send("This is the suggest backend");
});
app.get('/calendar', function (req, res) {
    
})

app.get('/food', function (req, res) {
  client.search({
    term: 'boba',
    latitude: '37.349055586417926',
    longitude: '-121.93956957656205',
    /*
    term: req.query.term,
    latitude: req.query.latitude,
    longitude: req.query.longitude,
    */
    sort_by: 'best_match',
    limit: '4',
    radius: '3000'
  }).then(response => {
    if(response.jsonBody.total > 0){
      var retStr = "There are "+ response.jsonBody.total + " " + req.query.term + " businesses. Here are the best four. "
      //res.send(JSON.stringify(response.jsonBody));
      response.jsonBody.businesses.forEach(ele => {
        retStr += ele.name + " is around " + Math.floor(ele.distance) + " meters away. " 
      });
      res.send(retStr);
    } else{
      res.send(JSON.stringify({
        code: 0,
        msg: "Error. There are no places like"
      }))
    }
  }).catch(e => {
    res.send("Error");
  });
})

app.listen(3001);