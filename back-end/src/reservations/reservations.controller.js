/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service");

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params || req.body.data
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation ${reservation_id}cannot be found.`
  });
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if(data[propertyName]) {
      return next();
    }
    return next ({
      status: 400,
      message: `Reservation must include a ${propertyName}`
    })
  }
}

function hasValidStatus(req, res, next) {
  const { data: { status } } = req.body;
  if (status === "booked" || status === "seated" || status === "finished" || status === "cancelled"){
    res.locals.status = status;
    return next();
  }
  return next({
    status: 400,
    message: `Invalid status: ${status}.`
  })
}

function statusIsFinished(req, res, next) {
  const status = res.locals.reservation.status;

  if(status === "finished" || status === "cancelled") {
    return next({
      status: 400,
      message: "Reservation status is finished."
    })
  }
  return next();
}

function statusIsBooked(req, res, next) {
  const { status } = req.body.data;

  if (status === "finished" || status === "seated" || status === "cancelled") {
    return next({
      status: 400,
      message: `Invalid status: ${status}.`
    })
  }
    return next();
}

function reservationDateValidation(req, res, next) {
  const date = req.body.data.reservation_date;
  let date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
  if (date_regex.test(date)) {
    return next();
  }
  return next({ 
    status: 400, 
    message: "reservation_date must be a date"
   });
}

function noPastReservationsValidation(req, res, next) {
  const date = req.body.data.reservation_date;
  const time = req.body.data.reservation_time;
  let today = new Date().toISOString().slice(0, 10);
  let currentTime = new Date().getHours();
  if ((date < today) || (date === today && time < currentTime)) {
    return next ({
      status: 400,
      message: "Can only book future reservations."
    })
  }
  return next();
}

function noTuesdayReservationsValidation(req, res, next) {
  const date = new Date(req.body.data.reservation_date);
  const dayOfWeek = date.getDay();
 
  if (dayOfWeek === 1) {
    return next({
      status: 400,
      message: "Restaurant is closed on Tuesdays."
    })
  }
  return next();
}

function reservationTimeValidation(req, res, next) {
  const time = req.body.data.reservation_time;
  const { data = {} } = req.body;
  let time_regex = /^(2[0-3]|[01][0-9]):[0-5][0-9]$/;
  if (/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(data["reservation_time"]) || 
  /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(data['reservation_time'])) {
    return next();
  }
  return next({ 
    status: 400, 
    message: "reservation_time must be a time" 
  });
}

function reservationTimeOpenHoursValidation(req, res, next) {
  const time = req.body.data.reservation_time;
  const timeInHours = Number(time.split(":")[0]);
  const timeInMinutes = Number(time.split(":")[1]);

  if (timeInHours < 10 || timeInHours <= 10 && timeInMinutes < 30 || timeInHours === 21 && timeInMinutes > 30 || timeInHours > 21) {

    return next({
      status: 400,
      message: "Restaurant reservations are only allowed between the hours of 10:30am and 9:30pm. Please select another time."
    })
  }
  return next();
}

function phoneNumberValidation(req, res, next) {
  const { mobile_number } = req.body.data;

  const mobileNumberDigitsOnly = mobile_number.split("-").join("");
  const isValidPhoneNumber = /^\d+$/.test(mobileNumberDigitsOnly);

  if(!isValidPhoneNumber) {
    return next({
      status: 400,
      message: "Please enter valid phone number."
    })
  }
  return next();
}


function peopleValidation(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (people <= 0 || !Number.isInteger(people)) {
    return next ({
      status: 400,
      message: `people must have a number that is an integer greater than 0`
    })
  }
  return next();
}

async function list(req, res) {
  let { date }  = req.query;
  const { mobile_number } = req.query;
  if(date) {
    const data = await reservationsService.listReservationsByDate(date);
    return res.json({ data });
  } else {
    const data = await reservationsService.search(mobile_number);
    return res.json({ data });
  }
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data })
}

async function read(req, res, next) {
  const { reservation: data } = res.locals;
  res.json({ data })
}

async function update(req, res, next) {
  const { reservation } = res.locals;
  const { reservation_id } = res.locals.reservation;
  const updatedReservation = {
    ...reservation,
    ...req.body.data,
    reservation_id: reservation_id,
  }
  const data = await reservationsService.update(updatedReservation);

  res.json({ data: data[0] })
}

async function updateReservationStatus(req, res) {
  const { status } = res.locals;
  const { reservation_id } = res.locals.reservation;
  const data = await reservationsService.updateReservationStatus(reservation_id, status);
  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), read],
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    statusIsBooked,
    peopleValidation,
    reservationDateValidation,
    reservationTimeValidation,
    noTuesdayReservationsValidation,
    noPastReservationsValidation,
    reservationTimeOpenHoursValidation,
    phoneNumberValidation,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    peopleValidation,
    reservationDateValidation,
    reservationTimeValidation,
    phoneNumberValidation,
    asyncErrorBoundary(update),
  ],
  updateReservationStatus: [
    asyncErrorBoundary(reservationExists),
    hasValidStatus,
    statusIsFinished,
    asyncErrorBoundary(updateReservationStatus),
  ]
};
