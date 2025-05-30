import axios from "axios";
import React, { useState } from "react";

function UsageComp() {
  const [modalOpen, setModalOpen] = useState(false);
  const [callResult, setCallResult] = useState("");
  const [btnState, setBtnState] = useState(true);
  return (
    <>
      <h3 className="mb-3 text-3xl font-bold  border-b-3 border-gray-300 pb-3 w-full absolute top-4 left-0 p-6">
        이용안내
      </h3>
      <div className="flex justify-center items-center  absolute top-[180px] w-8/9 left-[50%] translate-x-[-50%]">
        <div className="grid grid-cols-2 gap-x-20 gap-y-20 justify-center items-center">
          <div className=" h-full">
            <h4 className="text-4xl font-bold mb-4 flex gap-3 title">
              담당자 연락처
            </h4>
            <p className="text-3xl flex items-center gap-3">
              <img src="./images/icon02.png" alt="" />
              064-735-0632
            </p>
          </div>
          <div className=" h-full">
            <h4 className="text-4xl font-bold mb-4 flex gap-3 title">
              와이파이
            </h4>
            <p className="text-3xl flex items-center gap-3">
              <img src="./images/icon02.png" alt="" />
              CKL / 123456789a
            </p>
          </div>
          <div className=" h-full">
            <h4 className="text-4xl font-bold mb-4 flex gap-3 title">
              담당자 호출
            </h4>
            <p className="text-3xl flex items-center gap-3">
              <button
                className="px-9 py-3 bg-blue-500 rounded-2xl text-white text-2xl font-bold hover:bg-blue-600"
                onClick={() => setModalOpen(true)}
              >
                담당자 호출
              </button>
            </p>
          </div>
          <div className=" h-full">
            <h4 className="text-4xl font-bold mb-4 flex gap-3 title">
              주차이용
            </h4>
            <p className="text-3xl flex items-center gap-3">
              <img src="./images/icon02.png" alt="" />
              주차는 무료로 입니다.
            </p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">담당자 호출</h2>
            <p className="text-lg mb-6 h-[100px]">
              <p className="font-bold mb-3">담당자를 호출하시겠습니까?</p>
              <p className="text-red-600">{callResult}</p>
            </p>

            <div className="flex justify-end gap-4">
              <button
                className={`px-6 py-2 bg-gray-300 rounded-lg font-bold
                ${btnState ? "hover:bg-gray-400" : "cursor-not-allowed"}
                hover:bg-gray-400`}
                onClick={() => {
                  if (!btnState) return;
                  setModalOpen(false);
                }}
              >
                취소
              </button>
              <button
                className={`px-6 py-2 ${
                  btnState
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white rounded-lg font-bold`}
                onClick={() => {
                  if (!btnState) return;

                  setCallResult("담당자 호출이 중입니다.");
                  setBtnState(false);

                  axios
                    .get(
                      `/api/jeju_content_agency/send_sms?message=${new Date().toLocaleString()}_테미에서담당자호출함&phoneNumber=01050586511`
                    )
                    .then((response) => {
                      console.log(response);
                      if (response.data[0].resultCode === "00") {
                        setCallResult(
                          "담당자 호출이 완료되었으니. 조금만 기다려주세요."
                        );
                        setBtnState(true);

                        setTimeout(() => {
                          setCallResult("");
                          setModalOpen(false);
                        }, 5000);
                      } else {
                        //alert("담당자 호출에 실패했습니다.");
                      }
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                      //alert("담당자 호출 중 오류가 발생했습니다.");
                      setCallResult(
                        "담당자 호출이 완료되었으니. 조금만 기다려주세요."
                      );
                      setBtnState(true);

                      setTimeout(() => {
                        setCallResult("");
                        setModalOpen(false);
                      }, 5000);
                    });
                }}
              >
                호출하기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsageComp;
