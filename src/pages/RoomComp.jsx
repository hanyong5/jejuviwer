import React, { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ROOMS = [
  "창작실 1",
  "창작실 2",
  "창작실 3",
  "창작실 4",
  "창작실 5",
  "편집실 (Mac 1)",
  "편집실 (Mac 2)",
  "편집실 (IBM)",
  "스튜디오 1",
  "스튜디오 2",
  "화상회의실",
  "회의실",
  "다목적창작실",
  "머들코지",
];

function RoomComp() {
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookingData, setBookingData] = useState(null);

  const dateStr = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-01`;
  console.log(dateStr);

  // 예약 데이터 불러오기
  const fetchBooking = async () => {
    try {
      const url = `/rest/booking/list?type=BOO_TYPE002&strDate=${dateStr}`;
      const res = await axios.get(url, {
        headers: { Accept: "application/xml" },
      });
      const bookings = parseXML(res.data);
      setBookingData(bookings);
    } catch (e) {
      console.error("예약 데이터 불러오기 오류", e);
    }
  };

  // XML 파싱 함수
  function parseXML(xmlString) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const items = xmlDoc
      .getElementsByTagName("items")[0]
      .getElementsByTagName("items");

    const bookings = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const equipName = item
        .getElementsByTagName("equipName")[0]
        ?.textContent.trim();
      const team = item.getElementsByTagName("team")[0]?.textContent.trim();
      const stat = item.getElementsByTagName("stat")[0]?.textContent.trim();
      const hopeDate = item
        .getElementsByTagName("hopeDate")[0]
        ?.textContent.trim();
      const hopeHours = item
        .getElementsByTagName("hopeHours")[0]
        ?.textContent.trim()
        .split(/\s*,\s*/);

      bookings.push({
        equipName,
        team,
        stat,
        hopeDate,
        hopeHours,
      });
    }

    return bookings;
  }

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
      <h3 className="mb-3 text-3xl font-bold">장소 및 공간대여</h3>
      <div style={{ display: "flex" }}>
        {/* 왼쪽 메뉴 (방 목록) */}
        <div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {ROOMS.map((room) => (
              <button
                key={room}
                style={{
                  background: selectedRoom === room ? "#32ADE6" : "#fff",
                  border: "1px solid #ccc",
                  padding: 10,
                  margin: 2,
                  width: "150px",
                  borderRadius: "16px",
                  color: selectedRoom === room ? "#fff" : "#000",
                  fontWeight: selectedRoom === room ? "bold" : "normal",
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
            <p className="bg-blue-600 text-white px-3 py-1 rounded-md flex items-center">
              {selectedDate.getMonth() + 1}월 예약 정보
            </p>
          </div>

          {!bookingData && <p>예약 정보를 불러오는 중입니다...</p>}
          {filteredBookings?.length > 0 ? (
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
          )}
        </div>
      </div>
    </>
  );
}

export default RoomComp;
