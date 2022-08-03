import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { isSameMonth, isSameDay, addDays, parse, startOfMonth , endOfMonth, startOfWeek, endOfWeek  } from "date-fns";
import { Icon } from "@iconify/react";
import axios, { Axios } from "axios"

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return(
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth,'M')}월
                    </span>
                    {format(currentMonth,'yyyy')}
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth}/>
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}/>
            </div>
        </div>
    );
};

const RenderDays = () =>{
    const days = [];
    const date = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    for (let i = 0; i < date.length; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};

const RenderCells = ({currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : format(currentMonth, 'M') !== format(day, 'M')
                            ? 'not-valid'
                            : 'valid'
                    }`}
                    key={day}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};

const Calendar = () => {
    const [currentMonth, setCurrenMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrenMonth(subMonths(currentMonth,1));
    };
    const nextMonth = () => {
        setCurrenMonth(addMonths(currentMonth,1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };

    const testtest = () => {
        let req = {
            method: "get",
            headers: {
                "Accept": "application/json",
                "content-type":"application/json"
            },
            body: JSON.stringify()
        }
        axios.get("http://localhost:3001/getList", req)
        .then((res)=> console.log(res.data[0].count)
        )
        .then(data => console.log(data));
    }


    return (
        <div className="calendar">
            <RenderHeader
                currentMonth = {currentMonth}
                prevMonth = {prevMonth}
                nextMonth = {nextMonth}
            />
            <RenderDays/>
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
        <button onClick={testtest}>가져오기</button>
        </div>
    );
};

export default Calendar;