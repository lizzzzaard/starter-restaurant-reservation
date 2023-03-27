const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service")

async function tableExists (req, res, next) {
  const { table_id } = req.params;
  const table = await tablesService.read(table_id);
  if(table) {
    res.locals.table = table;
    return next();
  }
  return next({
    status: 404,
    message: `Table ${table_id} cannot be found.`
  })
}

async function reservationExists(req, res, next) {
  const { data: { reservation_id } } = req.body;
  const reservation = await reservationsService.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  return next({
    status: 404,
    message: `Reservation_id: ${reservation_id} does not exist`
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
        message: `Table must include a ${propertyName}`
      })
    }
}

function tableNameValidation(req, res, next) {
    const name = req.body.data.table_name;
    if (name.length <= 1) {
        return next({
            status: 400,
            message: "table_name must be more than one character."
        })
    }
    return next();
}

function capacityValidation(req, res, next) {
    const { data: { capacity } = {} } = req.body;
    if (capacity <= 0 || !Number.isInteger(capacity)) {
      return next ({
        status: 400,
        message: `capacity must have a number that is an integer greater than 0`
      })
    }
    return next();
  }

function tableCapcityValidation(req, res, next) {
    const { capacity } = res.locals.table;
    const { people } = res.locals.reservation;

    if (capacity < people ) {
      return next({
        status: 400,
        message: "Table does not have sufficient capacity."
      })
    }
    return next();
}

function tableOccupiedValidation(req, res, next) {
  const { reservation_id } = res.locals.table;
  
  if(reservation_id === null) {
    return next();
  }
  return next({
    status: 400,
    message: "Table is occupied."
  })
}

function tableNotOccupiedValidation(req, res, next) {
  const { reservation_id } = res.locals.table;

  if(reservation_id !== null) {
    return next();
  }
  return next({
    status: 400,
    message: "Table is not occupied."
  })
}

function tableIsSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
    return next({
      status: 400,
      message: "Table is already seated."
    })
  }
  return next();
}

async function list(req, res, next) {
    const data = await tablesService.listAllTablesByName();
    return res.json({ data })
}
async function create(req, res, next) {
    const data = await tablesService.create(req.body.data)
    res.status(201).json({ data })
}

async function read(req, res, next) {
  const data = res.locals.table;
  return res.json({ data })
}

async function update(req, res, next) {
  const { table_id } = req.params;
  const { table } = res.locals;
  const { reservation_id } = res.locals.reservation;
  const updatedTableInfo = {
    ...table,
    reservation_id: reservation_id,
  }

  const updatedTable = await tablesService.update(updatedTableInfo);

  await reservationsService.updateReservationStatus(reservation_id, "seated");

  res.json({ data: updatedTable})
}

async function finish(req, res, next) {
  const { table_id } = req.params;
  const { table } = res.locals;
  const updatedTableInfo = {
    ...table,
    reservation_id: null,
  }
  const updatedTable = await tablesService.finish(updatedTableInfo);
  const { reservation_id } = res.locals.table;
  
  const updatedReservation = await reservationsService.updateReservationStatus(reservation_id, "finished");
  
  res.json({ data: updatedTable });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(tableExists), asyncErrorBoundary(read)],
    create: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        capacityValidation,
        tableNameValidation,
        asyncErrorBoundary(create)
    ],
    update: [
      bodyDataHas("reservation_id"),
      asyncErrorBoundary(tableExists),
      asyncErrorBoundary(reservationExists),
      tableCapcityValidation,
      tableOccupiedValidation,
      tableIsSeated,
      asyncErrorBoundary(update),
    ],
    finish: [
      asyncErrorBoundary(tableExists), 
      tableNotOccupiedValidation,
      asyncErrorBoundary(finish)
    ],
};