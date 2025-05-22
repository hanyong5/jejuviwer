import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Loading from "../components/Loading";
import CalendarComp from "./CalendarComp";
import holyday from "./day";

const ROOMS = [
  "창작실 1",
  "창작실 2",
  "창작실 3",
  "창작실 4",
  "창작실 5",
  "편집실 (Mac 1)",
  "편집실 (Mac 2)",
  "편집실 (IBM)",
  "스튜디오1",
  "스튜디오2",
  "화상 회의실",
  "회의실",
  "다목적창작실",
  "머들코지",
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
      // http://101.55.20.4:8000/api/jeju_content_agency/get_location_booking?type=BOO_TYPE003&strDate=2025-05-03
      // const url = `/rest/booking/list?type=BOO_TYPE002&strDate=${dateStr}`;
      const url = `/api/jeju_content_agency/get_location_booking?type=BOO_TYPE002&strDate=${dateStr}`;
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
        {selectedDate.getMonth() + 1}월 장소 및 공간대여
      </h3>
      {loading ? (
        <Loading />
      ) : (
        <div style={{ display: "flex" }}>
          {/* 왼쪽 메뉴 (방 목록) */}
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {ROOMS.map((room, i) => (
                <button
                  key={room}
                  style={{
                    background: selectedRoom === room ? "#32ADE6" : "#fff",
                    border: "1px solid #ccc",
                    padding: 10,
                    margin: 2,
                    width: "190px",
                    borderRadius: "16px",
                    fontSize: "1.4em",
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
            <div className="flex justify-between">
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
                    <strong>{booking.hopeDate}</strong> - {booking.team} (
                    {booking.hopeHours.join(", ")}시)
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
