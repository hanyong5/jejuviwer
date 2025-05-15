import React from "react";

function UsageComp() {
  return (
    <>
      <div className="container h-full">
        <h3 className="mb-3 text-3xl font-bold absolute  border-b-3 border-gray-300 pb-3 w-full">
          이용안내
        </h3>
        <div className="flex justify-center items-center h-full">
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
                <button className="px-9 py-3 bg-blue-500 rounded-2xl text-white text-2xl font-bold hover:bg-blue-600">
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
      </div>
    </>
  );
}

export default UsageComp;
