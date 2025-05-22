import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isWeekend,
  getDay,
} from "date-fns";

const Calendar = ({ filteredBookings, holidays }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const isHoliday = (dateStr) => holidays.hasOwnProperty(dateStr);
  const getHolidayNames = (dateStr) => holidays[dateStr] || [];

  const generateDayCell = (day) => {
    const formatted = format(day, "yyyy-MM-dd");
    const dayNumber = format(day, "d");
    const bookingsToday = filteredBookings.filter(
      (b) => b.hopeDate === formatted
    );

    const isCurrentMonth = isSameMonth(day, monthStart);
    const dayOfWeek = getDay(day); // 0: Sun, 6: Sat

    const isToday = formatted === format(new Date(), "yyyy-MM-dd");

    let textColor = "text-gray-800";
    if (dayOfWeek === 0) textColor = "text-red-500"; // Sunday
    else if (dayOfWeek === 6) textColor = "text-blue-500"; // Saturday
    if (isHoliday(formatted)) textColor = "text-red-600 font-bold"; // Holiday

    return (
      <div
        key={formatted}
        className={`border-b-2 border-gray-500 p-2 h-28 text-xs align-top overflow-auto ${
          isCurrentMonth ? "bg-white" : "bg-gray-200"
        } ${isToday ? "todayView" : ""}`}
      >
        <div className={`font-bold ${textColor} text-right`}>{dayNumber}</div>
        {isHoliday(formatted) && (
          <div className="text-[10px] text-red-500 text-right">
            {getHolidayNames(formatted).join(", ")}
          </div>
        )}
        {bookingsToday.map((booking, idx) => (
          <div key={idx} className="mt-1 flex flex-col ">
            <span className="font-bold text-right mb-1">
              {booking.team.length > 3
                ? booking.team.slice(0, 3) + "..."
                : booking.team}
            </span>
            <span className="bg-amber-600 rounded text-white px-1  text-center">
              {booking.hopeHours[0]}~
              {booking.hopeHours.length > 1
                ? booking.hopeHours[booking.hopeHours.length - 1]
                : booking.hopeHours[0]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      days.push(generateDayCell(day));
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day} className="grid grid-cols-7">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div>
      {/* <h2 className="text-xl font-bold mb-4 text-center">
        {format(currentDate, "yyyy년 MM월")}
      </h2> */}
      <div className="grid grid-cols-7 text-center font-bold border-b">
        {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      {rows}
    </div>
  );
};

export default Calendar;
