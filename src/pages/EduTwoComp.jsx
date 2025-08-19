import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Loading from "../components/Loading";
import CalendarComp from "./CalendarComp";
import holyday from "./day";

const ROOMS = [
  "레진 3D 프린터 캐리마 LM1",
  "3D 프린터 큐비콘 Style NEO-A22C",
  "레이저커팅기: 알디웍스(Rdworks)(콘텐츠공작소)",
  "CNC라우터: 마하3(Mach 3)(콘텐츠공작소)",
  "UV평판 플로터 (콘텐츠공작소)",
  "멀티프레스/머그프레스 (콘텐츠공작소)",
  "궁극 스프레이부스 S KSB-001 (콘텐츠공작소)",
];

function RoomComp() {
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

  return (
    <>
      <h3 className="mb-4 text-3xl font-bold   border-b-3 border-gray-300 pb-3 w-full">
        {selectedDate.getMonth() + 1}월 장비 대여 일정
      </h3>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ display: "flex" }}>
          {/* 왼쪽 메뉴 (방 목록) */}
          <div>
            <div className="flex flex-col w-[400px] gap-4 ">
              {ROOMS.map((room, i) => (
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
          </div>
          {/* 오른쪽 예약 정보 */}
          <div style={{ marginLeft: 32, flex: 1 }}>
            <div className="flex justify-between  absolute right-10 top-7">
              <h3 className="mb-3 text-3xl font-bold">{selectedRoom}</h3>
              {/* <p className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center">
                {selectedDate.getMonth() + 1}월 예약 정보
              </p> */}
            </div>
            {!bookingData && <p>예약 정보를 불러오는 중입니다...</p>}
            {/* {filteredBookings?.length > 0 ? (
              <ul>
                {filteredBookings.map((booking, index) => (
                  <li key={index}>
                    <strong>{booking.hopeDate}</strong> - {booking.team} ({" "}
                    {booking.hopeHours[0]} ~
                    {booking.hopeHours.length > 1
                      ? booking.hopeHours[booking.hopeHours.length - 1]
                      : booking.hopeHours[0]}
                    시 )
                  </li>
                ))}
              </ul>
            ) : (
              <p>해당 예약 정보가 없습니다.</p>
            )} */}

            <CalendarComp
              filteredBookings={filteredBookings}
              holidays={holyday[0]}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default RoomComp;
