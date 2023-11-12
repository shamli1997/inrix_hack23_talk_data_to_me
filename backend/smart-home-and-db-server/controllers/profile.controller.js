import fs from "fs";
import { ApiKeyManager } from '@esri/arcgis-rest-request';
import { geocode } from '@esri/arcgis-rest-geocoding';
import profileData from "../profile.json" assert { type: 'json' }

const getProfile = async (req, res) => {
    const dataPath = './profile.json';
    try {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
              throw err;
            }
            res.send(JSON.parse(data))
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    console.log(req.body)
    try {
        const dataPath = './profile.json';
        fs.writeFile(dataPath, JSON.stringify(req.body), 'utf8', (err, data) => {
            console.log(req.body);
            if (err) {
              throw err;
            }
            //callback();
            res.send({
                status: 200,
                msg: "Profile Updated!"
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLatLong = async (req, res) => {
    try {
        var location = req.params.location;
        var address = ""
        var postal = 95126

        if (location == 'home'){
            address = profileData.home;
            postal = profileData.homezip;
        }
        else if (location == 'work'){
            address = profileData.work;
            postal = profileData.workzip;
        }
        else if (location == 'other'){
            address = profileData.other;
            postal = profileData.otherzip;
        }

        const apiKey = "AAPK97059ff5873a43f487d21accd2e2190eZvDZkUScpCOZn268Pqv2U8WtNQHsdfw_-rF6zvc7ym6EMc7G6i9cNDtMPxo7mPEV";
        const authentication = ApiKeyManager.fromKey(apiKey);
        geocode({
            address: address,
            postal: postal,
            countryCode: "USA",
            authentication
        }).then(function (response) {
            if (response.length != 0){
                var latlong = []
                latlong.push(response.candidates[0].location.y);
                latlong.push(response.candidates[0].location.x)
                res.send(latlong);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
export { getProfile, updateProfile, getLatLong }
