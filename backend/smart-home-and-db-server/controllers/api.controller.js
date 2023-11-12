import axios from "axios";
import properties from "../config.json" assert { type: 'json' }

const test = async (req, res) => {
    try {
        var response = {
            code: 1,
            msg: "Hello from Inchara's Server"
        }
        res.send(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const apiNewDeveloper = async (req, res) => {
    try {
        axios({
            method:'get',
            url: properties.http + properties.bridgeip + properties.api + 'newdeveloper'
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerApp = async (req, res) => {
    try {
        axios({
            method:'post',
            url: properties.http + properties.bridgeip + '/api',
            data: {
                devicetype: properties.devicetype
            }
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getLights = async (req, res) => {
    try {
        var url = properties.http + properties.bridgeip + properties.api + properties.username + '/lights';
        console.log(url);
        axios({
            method:'get',
            url: url
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLight = async (req, res) => {
    try {
        var url = properties.http + properties.bridgeip + properties.api + properties.username + '/lights/' + req.params.id;
        console.log(url);
        axios({
            method:'get',
            url: url
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const putLight = async (req, res) => {
    try {
        var state = req.params.state == 'on'? true : false;
        var url = properties.http + properties.bridgeip + properties.api + properties.username + '/lights/' + req.params.id + '/state'; 
        var data = {
            "on": state
        }
        axios({
            method:'put',
            url: url,
            data: data
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const adjustLight = async (req, res) => {
    try {
        var url = properties.http + properties.bridgeip + properties.api + properties.username + '/lights/' + req.params.id + '/state'; 
        var data = {
            "on": true,
            "bri": Number(req.params.bri),
            "sat": Number(req.params.sat),
            "hue": Number(req.params.hue)
        }
        axios({
            method:'put',
            url: url,
            data: data
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecommendation = async (req, res) => {
    try {
        const tvShows = [
            "Stranger Things",
            "The Mandalorian",
            "The Witcher",
            "Money Heist",
            "The Crown",
            "Ozark",
            "Breaking Bad",
            "Game of Thrones",
            "Fleabag",
            "The Umbrella Academy",
            "The Queen's Gambit!",
            "Ted Lasso",
            "The Falcon and the Winter Soldier",
            "WandaVision",
            "The Boys",
            "The Handmaid's Tale",
            "The Great",
            "Black Mirror",
            "Cobra Kai",
            "Succession"
          ];

          const shuffledArray = tvShows.sort(() => Math.random() - 0.5);
          res.data = shuffledArray.slice(0, 3);

          console.log(res.data)
        res.send({ 
            code: 1,
            msg: 'How about taking some time for yourself to relax? Maybe watching a good TV show could help take your mind off things. If you are up for it, here are a few recommendations:' + res.data.join(',') 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const callRouting = async (req, res) => {
    try {
        axios({
            method:'get',
            url: 'http://localhost:4001/location/findtime'
        })
        .then(function (response) {
            if (response.data.code != 0){
                var time = response.data.time;
                console.log('time',time);
            }
            setTimeout(function () {
                setHeaterOn();
            }, time*1000);
            setTimeout(function () {
                setLightOn();
            }, (time+2)*1000);
            res.send({
                msg: 'Success!'
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setHeaterOn = async (req, res) => {
    try {
        var url = properties.heaterOn;
        axios({
            method:'put',
            url: url
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const setLightOn = async (req, res) => {
    try {
        var url = properties.lightOn;
        axios({
            method:'put',
            url: url
        })
        .then(function (response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export { test, apiNewDeveloper, registerApp, getLight, getLights, putLight, adjustLight, getRecommendation, callRouting }
