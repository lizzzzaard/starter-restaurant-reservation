
function validDateAndTime(reservation) {
    const date = reservation.reservation_date;
    const time = reservation.reservation_time;
    const error = [];

    //No reservations allowed on Tuesdays
    const dayOfWeek = new Date(date).getDay();

    if (dayOfWeek === 1) {
        error.push(new Error("Restaurant is closed on Tuesdays. Please choose another day."))
    }

    //No reservations allowed in the past
    let today = new Date().toISOString().slice(0, 10)
    if (date < today) {
        error.push(new Error("Can only book reservations in the future."))
    }
    
    return error;
}

export default validDateAndTime;