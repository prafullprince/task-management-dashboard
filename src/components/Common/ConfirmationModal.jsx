import React from "react";

function ConfirmationModal({ modalData, setModalData }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-auto bg-white backdrop-blur-sm bg-opacity-10">
      <div className="w-11/12 mx-auto max-w-[350px] border rounded-lg border-richblack-400 bg-richblack-800 p-6 flex flex-col gap-2">
        {/* text 1 , cancel */}
        <div className="flex justify-between">
          <p className="text-2xl font-semibold text-richblack-5">
            {modalData.text1}
          </p>
          <button
            className=" text-pink-200 font-bold text-2xl"
            onClick={() => setModalData(null)}
          >
            X
          </button>
        </div>
        {/* text2 */}
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData.text2}
        </p>
        {/* buttons */}
        <div className="flex justify-end">
          <div className="flex items-center gap-x-4">
            <button
              className="cursor-pointer rounded-md py-[8px] px-[20px] font-semibold text-richblack-900 bg-yellow-50"
              onClick={modalData.btn1Handler}
            >
              {modalData.btn1Text}
            </button>
            <button
              className="cursor-pointer rounded-md bg-richblack-900 py-[8px] px-[20px] font-semibold text-richblack-5"
              onClick={modalData.btn2Handler}
            >
              {modalData.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
