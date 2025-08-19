import React, { useEffect, useState } from "react";
import CalendarWeekComp from "./CalendarWeekComp";
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

  return (
    <>
      <h3 className="mb-4 text-3xl font-bold   border-b-3 border-gray-300 pb-3 w-full">
        {selectedDate.getMonth() + 1}월 장비 대여 일정1
      </h3>
      <div className="flex">
        <div className="flex flex-col w-[400px] gap-4 bg-gray-100">
          <button>test</button>
        </div>
        <div style={{ marginLeft: 32, flex: 1 }}>
          <CalendarWeekComp />
        </div>
      </div>
    </>
  );
}

export default EquipTwoComp;
