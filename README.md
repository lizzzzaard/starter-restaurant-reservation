# Periodic Tables: A Restaurant Reservation App

The Restaurant Reservation App is a full stack application that I completed as a final capstone in Thinkful's Software Engineering Bootcamp.

Objective from the assignment:
> "You have been hired as a full stack developer at Periodic Tables, a startup that is creating a reservation system for fine dining restaurants. The software is used only by restaurant personnel when a customer calls to request a reservation. At this point, the customers will not access the system online."

This web applications is intended to be used by restaurant personal to assist them managing reservations at their restaurant. Some of the features include creating, editing, and cancelling reservations as well as managing the status of reservations (i.e. booked, seated, finished). 


### Project Link
Find the deployed version hosted on Render [here](https://restautant-reservation-front.onrender.com).



## Languages & Frameworks:
- Javascript
- React.js & React Router
- PostgreSQL
- CSS
- Bootstrap CSS
- Node.js
- Express.js
- Knex.js

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.
