# Talk Data to Me - Hackathon Project (Inrix Hack 2023)

## Project Overview

Talk Data to Me is a voice assistant system designed to enhance your daily commute and provide valuable information and services based on your needs. The project integrates INRIX APIs with other Public APIs to offer a seamless and personalized experience during your journey.

## User Journey

1. Finding Time to Reach Home
   - Ask the voice assistant for the estimated time to reach home while driving from work.
2. Entertainment on Rough Days
   - Express a rough day, and the assistant suggests popular TV shows to lighten your mood.
3. Satisfying Hunger on the Way
   - Declare hunger, and the assistant provides a list of restaurants along your route.
4. Calendar Overview
   - Query your calendar to get a readout of upcoming events and schedules
5. Parking Situation Near Favorite Grocery Store
   - Check the probability of finding parking near your favorite grocery store.
6. Preconditioning the Living Room
   - Prepare your living room for your arrival by turning on the heater and lights

## Web Servers

1. Location Server

   - Consumes INRIX APIs to provide routing information, parking probabilities.

2. Smart Home Server

   - Manipulates user data to control home devices such as heaters and lights.

3. Entertainment Server
   - Handles third-party APIs to suggest TV shows, get Calendar events and restaurant suggestions based on user mood.

### Set up Backend Microservices(Node.js and Express.js)

1. Clone the Repository
   `git clone https://github.com/shamli1997/inrix_hack23_talk_data_to_me.git`
2. `cd backend`

### Set up Location server

1. `cd location_services_server`
2. `npm install`
3. `npm start`

### Set up Entertainment server

1. `cd miscBackend`
2. `npm install`
3. `node app.js`

### Set up Smart Home server

1. `cd smart-home-and-db-server`
2. `npm install`
3. `npm start`

## Set up Frontend (React.js)

1. `cd frontend`
2. `npm install`
3. `npm start`

## Verify Microservices Running:

Open your browser and navigate to the endpoints of each microservice (e.g., http://localhost:service1_port, http://localhost:service2_port) to ensure that the microservices are running successfully.
