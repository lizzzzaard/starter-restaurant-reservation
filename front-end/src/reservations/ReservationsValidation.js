
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

    //No reservations before 10:30AM or after 9:30PM
    const timeInHours = Number(time.split(":")[0]);
    const timeInMinutes = Number(time.split(":")[1]);

    if ((timeInHours <= 10 && timeInMinutes < 30) || (timeInHours >= 21 && timeInMinutes > 30)) {
        error.push(new Error("Restaurant reservations are only allowed between the hours of 10:30am and 9:30pm. Please select another time."))
    }

    return error;
}

export default validDateAndTime;