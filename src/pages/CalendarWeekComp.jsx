import React, { useEffect, useState } from "react";
import { startOfWeek, endOfWeek, addDays, format, getDay } from "date-fns";

// 주간 달력: 예약(filteredBookings)과 공휴일(holidays)을 주간 단위로 표시
function CalendarWeekComp({
  filteredBookings = [],
  holidays = {},
  value,
  onChangeDate,
}) {
  const [internalDate, setInternalDate] = useState(value || new Date());
  const isControlled = value instanceof Date;
  const displayDate = isControlled ? value : internalDate;

  useEffect(() => {
    if (value instanceof Date && !isNaN(value)) {
      // 부모가 값을 제공하면 내부 상태를 동기화할 필요는 없음 (displayDate로 처리)
    }
  }, [value]);

  const weekStart = startOfWeek(displayDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(displayDate, { weekStartsOn: 0 });

  const isHoliday = (dateStr) =>
    Object.prototype.hasOwnProperty.call(holidays, dateStr);
  const getHolidayNames = (dateStr) => holidays[dateStr] || [];

  const handlePrevWeek = () => {
    const nextDate = addDays(displayDate, -7);
    if (isControlled) {
      onChangeDate && onChangeDate(nextDate);
    } else {
      setInternalDate(nextDate);
    }
  };
  const handleNextWeek = () => {
    const nextDate = addDays(displayDate, 7);
    if (isControlled) {
      onChangeDate && onChangeDate(nextDate);
    } else {
      setInternalDate(nextDate);
    }
  };

  const renderDayHeader = (day) => {
    const dateStr = format(day, "MM/dd");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][getDay(day)];
    const fullStr = format(day, "yyyy-MM-dd");
    const isToday = fullStr === format(new Date(), "yyyy-MM-dd");
    const textColor =
      getDay(day) === 0
        ? "text-red-500"
        : getDay(day) === 6
        ? "text-blue-500"
        : "text-gray-800";

    return (
      <div
        key={fullStr}
        className={`p-2 border-b font-bold ${
          isHoliday(fullStr) || getDay(day) === 0
            ? "bg-pink-100"
            : isToday
            ? "bg-blue-100"
            : ""
        }`}
      >
        <div className={`flex items-center justify-between ${textColor}`}>
          <span>{dayOfWeek}</span>
          <span>{dateStr}</span>
        </div>
      </div>
    );
  };

  const renderDayBody = (day) => {
    const formatted = format(day, "yyyy-MM-dd");
    const bookingsToday = (filteredBookings || []).filter(
      (b) => b.hopeDate === formatted
    );

    return (
      <div
        key={`daybody-${formatted}`}
        className={`p-2 h-[300px] overflow-auto ${
          format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
            ? "bg-blue-100"
            : (holidays && holidays[formatted]) || getDay(day) === 0
            ? "bg-pink-100"
            : ""
        }`}
      >
        {/* 예약을 시간 오름차순으로 정렬하여 출력 */}
        {bookingsToday
          .slice()
          .sort((a, b) => {
            // hopeHours[0]이 "09:00" 같은 문자열이므로, 시간으로 변환해서 비교
            const [aHour, aMin] = a.hopeHours[0].split(":").map(Number);
            const [bHour, bMin] = b.hopeHours[0].split(":").map(Number);
            if (aHour !== bHour) return aHour - bHour;
            return aMin - bMin;
          })
          .map((booking, idx) => (
            <div
              key={idx}
              className="mt-1 flex flex-col items-center justify-between gap-2 "
            >
              <span className="bg-blue-500 text-white text-sm rounded px-2 py-0.5 self-start">
                {booking.hopeHours[0]}~
                {booking.hopeHours.length > 1
                  ? booking.hopeHours[booking.hopeHours.length - 1]
                  : booking.hopeHours[0]}
              </span>
              <span className="font-semibold text-2xl truncate self-end">
                {booking.team.length > 5
                  ? booking.team
                      .split("")
                      .map((char, idx) => (idx % 2 === 1 ? "*" : char))
                      .join("")
                      .slice(0, 5) + "..."
                  : booking.team
                      .split("")
                      .map((char, idx) => (idx % 2 === 1 ? "*" : char))
                      .join("")}
              </span>
            </div>
          ))}
        {bookingsToday.length === 0 && (
          <>
            {holidays && holidays[formatted] ? (
              <div className="text-red-700 text-xl flex justify-center items-center h-[280px] font-bold">
                {holidays[formatted].join(", ")}
              </div>
            ) : (
              <div className="text-gray-400 text-xl h-[280px] font-bold flex justify-center items-center">
                없음
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // 주간 7일 생성
  const days = [];
  for (let d = weekStart; d <= weekEnd; d = addDays(d, 1)) {
    days.push(new Date(d));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button onClick={handlePrevWeek} className="px-3 py-1 border rounded">
          이전 주
        </button>
        <h3 className="text-xl font-bold">
          {format(weekStart, "yyyy.MM.dd")} ~ {format(weekEnd, "yyyy.MM.dd")}
        </h3>
        <button onClick={handleNextWeek} className="px-3 py-1 border rounded">
          다음 주
        </button>
      </div>

      <div className="grid grid-cols-7 gap-x-2">
        {days.map((day) => (
          <div
            key={format(day, "yyyy-MM-dd")}
            className="border rounded overflow-hidden"
          >
            {renderDayHeader(day)}
            {renderDayBody(day)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarWeekComp;
