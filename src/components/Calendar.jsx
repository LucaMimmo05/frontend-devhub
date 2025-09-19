import { useState, useEffect } from "react";

import "../styles/calendar.css";
const Calendar = () => {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    const [today] = useState(new Date());
    const [year] = useState(today.getFullYear());
    const [month] = useState(today.getMonth());
    const [days, setDays] = useState([]);

    useEffect(() => {
        renderCalendar(year, month);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, month]);

    const renderCalendar = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Start week from Monday
        const startOffset = firstDay === 0 ? 6 : firstDay - 1;

        const cells = [];

        // Empty slots
        for (let i = 0; i < startOffset; i++) {
            cells.push({ empty: true });
        }

        // Days of the month
        for (let d = 1; d <= daysInMonth; d++) {
            cells.push({
                day: d,
                isToday: d === today.getDate() && month === today.getMonth() && year === today.getFullYear(),
            });
        }

        setDays(cells);
    };

    return (
        <div className="calendar">
            <header className="calendar-header">
                <h2>{monthNames[month]}</h2>
                <span>{year}</span>
            </header>

            <div className="week-days">
                {weekDays.map((w, i) => (
                    <div key={i}>{w}</div>
                ))}
            </div>

            <div className="days-grid">
                {days.map((d, i) =>
                    d.empty ? (
                        <div key={i} className="empty"></div>
                    ) : (
                        <div key={i} className={`day ${d.isToday ? "today" : ""}`}>
                            {d.day}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Calendar;
