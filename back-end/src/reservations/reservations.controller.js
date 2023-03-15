/**
 * List handler for reservation resources
 */
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reservationsService = require("./reservations.service")

async function list(req, res) {
  //query the date
  let { date }  = req.query;
  //see if the date exists, if it does exists
  if(date) {
    //then list all reservations for one date
    const data = await reservationsService.listReservationsByDate(date);
    return res.json({ data });
  } else {
  //if not then list all of them
    const data = await reservationsService.listAllReservations();
    return res.json({ data });
  }
}

//async function listReservationsByDate(req, res) {
  //added in query.date since we need to list a reservation by /reservations?date=2035-12-30
//}

//async function listAllReservations(req, res) {
  //const data = await reservationsService.listAllReservations();
  //res.json({ data })
//}

module.exports = {
  list: asyncErrorBoundary(list),
};
