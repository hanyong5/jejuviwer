import React, { useEffect, useState } from "react";
import CalendarWeekComp from "./CalendarWeekComp";
import holyday from "./day";
import axios from "axios";

const ROOMS = [
  "레진 3D 프린터 캐리마 LM1",
  "3D 프린터 큐비콘 Style NEO-A22C",
  "레이저커팅기: 알디웍스(Rdworks)(콘텐츠공작소)",
  "CNC라우터: 마하3(Mach 3)(콘텐츠공작소)",
  "UV평판 플로터 (콘텐츠공작소)",
  "멀티프레스/머그프레스 (콘텐츠공작소)",
  "궁극 스프레이부스 S KSB-001 (콘텐츠공작소)",
];

function EquipTwoComp() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  const dateStr = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-01`;
  console.log(dateStr);

  // 예약 데이터 불러오기
  const fetchBooking = async () => {
    setLoading(true);
    try {
      // http://101.55.20.4:8000/api/jeju_content_agency/get_location_booking?type=BOO_TYPE003&strDate=2025-05-03
      // const url = `/rest/booking/list?type=BOO_TYPE002&strDate=${dateStr}`;
      const url = `/api/jeju_content_agency/get_location_booking?type=BOO_TYPE003&strDate=${dateStr}`;
      const res = await axios.get(url);
      const bookings = res.data;
      console.log(bookings);
      setBookingData(bookings.items);
    } catch (e) {
      console.error("예약 데이터 불러오기 오류", e);
    } finally {
      setLoading(false);
    }
  };

  // 예약 불러오기 (날짜 또는 방 변경 시)

  useEffect(() => {
    fetchBooking();
  }, [selectedDate, selectedRoom]);

  // 선택된 방 예약만 필터링
  const filteredBookings = bookingData?.filter(
    (booking) => booking.equipName === selectedRoom
  );

  function getWeekOfMonth(date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayWeekday = firstDay.getDay(); // 요일 (0=일, 1=월, ...)

    const currentDate = date.getDate();

    // 이번 달 1일의 요일을 반영하여 offset을 준 뒤 7로 나눈다.
    return Math.ceil((currentDate + firstDayWeekday) / 7);
  }

  return (
    <>
      <h3 className="mb-4 text-3xl font-bold   border-b-3 border-gray-300 pb-3 w-full">
        {selectedDate.getMonth() + 1}월 장비 대여 일정 (
        {getWeekOfMonth(selectedDate)}주차)
      </h3>
      <div className="flex">
        <div className="flex flex-col w-[400px] gap-4">
          {ROOMS.map((room) => (
            <button
              key={room}
              style={{
                background: selectedRoom === room ? "#32ADE6" : "#fff",
                border: "1px solid #ccc",
                padding: 10,
                margin: 2,
                width: "100%",
                borderRadius: "16px",
                fontSize: "1em",
                color: selectedRoom === room ? "#fff" : "#000",
                fontWeight: "bold",
              }}
              onClick={() => setSelectedRoom(room)}
            >
              {room}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 32, flex: 1 }}>
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-semibold">{selectedRoom}</div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() =>
                  setSelectedDate(
                    (d) =>
                      new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7)
                  )
                }
              >
                이전 주
              </button>
              <button
                className="px-3 py-1 border rounded"
                onClick={() => setSelectedDate(new Date())}
              >
                오늘
              </button>
              <button
                className="px-3 py-1 border rounded"
                onClick={() =>
                  setSelectedDate(
                    (d) =>
                      new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7)
                  )
                }
              >
                다음 주
              </button>
            </div>
          </div>
          <CalendarWeekComp
            value={selectedDate}
            onChangeDate={setSelectedDate}
            filteredBookings={filteredBookings || []}
            holidays={holyday[0]}
          />
        </div>
      </div>
    </>
  );
}

export default EquipTwoComp;
