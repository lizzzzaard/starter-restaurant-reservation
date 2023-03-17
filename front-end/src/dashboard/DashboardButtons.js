import React from "react";
import { useHistory } from "react-router";
import { today, previous, next } from "../utils/date-time";

function DashboardButtons({ date, setDate }){
    const currentDay = today();
    const previousDay = previous(date);
    const nextDay = next(date);

    const history = useHistory();


    const handlePreviousDaySubmit = (event) => {
        event.preventDefault();
        //setDate(previousDay);
        history.push(`/dashboard?date=${previousDay}`)
    };

    const handleCurrentDaySubmit = (event) => {
        event.preventDefault();
        //setDate(currentDay);
        history.push(`/dashboard?date=${currentDay}`)
    }

    const handleNextDaySubmit = (event) => {
        event.preventDefault();
        //setDate(nextDay);
        history.push(`/dashboard?date=${nextDay}`)
    }

    return (
        <div>
            <button type="button" onClick={handlePreviousDaySubmit}>Previous</button>
            <button type="button" onClick={handleCurrentDaySubmit}>Today</button>
            <button type="button" onClick={handleNextDaySubmit}>Next</button>
        </div>
    )
}

export default DashboardButtons;