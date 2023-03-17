/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service")

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if(data[propertyName]) {
      return next();
    }
    next ({
      status: 400,
      message: `Reservation must include a ${propertyName}`
    })
  }
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

//only reservations from today and on validation
function noPastReservationsValidation(req, res, next) {
  const date = req.body.data.reservation_date;
  let today = new Date().toISOString().slice(0, 10)
  if (date < today) {
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
  let time_regex = /^(2[0-3]|[01][0-9]):[0-5][0-9]$/;
  if (time_regex.test(time)) {
    return next();
  }
  next({ 
    status: 400, 
    message: "reservation_time must be a time" 
  });
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
  if(date) {
    const data = await reservationsService.listReservationsByDate(date);
    return res.json({ data });
  } else {
    const data = await reservationsService.listAllReservations();
    return res.json({ data });
  }
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data })
}


module.exports = {
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    peopleValidation,
    reservationDateValidation,
    noPastReservationsValidation,
    noTuesdayReservationsValidation,
    reservationTimeValidation,
    asyncErrorBoundary(create)]
    ,
  list: asyncErrorBoundary(list),
};
