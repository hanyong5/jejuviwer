import React, { useEffect, useState } from "react";

import data from "./data.jsx";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

function EduComp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    fetch("/api/jeju_content_agency/get_education_info?pageNum=1")
      .then((response) => response.json())
      .then((data) => setViewData(data));
  }, []);

  const openModal = (item) => {
    setSelected(item);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelected(null);
  };

  return (
    <>
      <h3 className="mb-3 text-3xl font-bold  border-b-3 border-gray-300 pb-3 w-full">
        교육안내
      </h3>

      <div className="h-full  flex justify-center items-center">
        <div className="w-full">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={4}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {viewData &&
              viewData.map((item) => (
                <SwiperSlide key={item.id} className="p-2">
                  <div className="gap-4 p-4 py-6 bg-white border-2 border-gray-300 rounded-lg shadow-lg flex flex-col items-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-50 object-cover rounded-md mb-3"
                    />
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    {/* <p className="text-sm text-gray-600 mb-1">
                    신청기간: {item.application}
                  </p> */}
                    <p className="text-xl text-gray-600 mb-1 font-bold">
                      {item.education}
                    </p>
                    <p className=" text-gray-600 mb-1 text-xl font-bold">
                      {item.location}
                    </p>

                    <p className=" text-gray-600 mb-1">
                      <button
                        className=" block px-8 py-2 bg-blue-500 rounded-2xl text-white text-xl  font-bold hover:bg-blue-600"
                        onClick={() => openModal(item)}
                      >
                        교육내용확인
                      </button>
                    </p>

                    {/* <p className="text-sm text-gray-600 mb-1">
                    정원: {item.capacity}명
                  </p> */}
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>

      {/* 모달 */}
      {modalOpen && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl mx-3 relative">
            {/* 왼쪽: 이미지 */}
            <div className="w-1/3 flex items-center justify-center p-5">
              <img
                src={selected.img}
                alt={selected.title}
                className="w-full h-90 object-cover rounded-md"
              />
            </div>
            {/* 오른쪽: 내용 */}
            <div className="w-2/3 p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-5">{selected.title}</h2>
                <p className="mb-2 text-gray-700 text-xl font-bold">
                  신청기간: {selected.application}
                </p>
                <p className="mb-2 text-gray-700 text-xl font-bold">
                  교육기간: {selected.education}
                </p>
                <p className="mb-2 text-gray-700 text-xl font-bold">
                  장소: {selected.location}
                </p>
                <p className="mb-2 text-gray-700 text-xl font-bold">
                  대상: {selected.targetAudience}
                </p>
                <p className="mb-2 text-gray-700 text-xl font-bold">
                  정원: {selected.capacity}명
                </p>
                <p className="mb-2 text-gray-700 text-xl font-bold">
                  수강료: {selected.tuition}
                </p>
              </div>
              <button
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
            {/* 닫기 버튼 (오른쪽 상단) */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              onClick={closeModal}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EduComp;
