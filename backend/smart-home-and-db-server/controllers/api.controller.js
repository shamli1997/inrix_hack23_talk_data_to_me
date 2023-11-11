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


export { test, apiNewDeveloper, registerApp, getLight, getLights, putLight, adjustLight };
