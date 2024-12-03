import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsCalendarDate } from "react-icons/bs";
import { formatedDueDate } from "../../helper/formatedDate";

function ViewModal({ viewModalData, setViewModalData }) {
  // hook
  const { task } = useSelector((state) => state.tasks);

  // currentTask
  const viewTask = task.filter((todo) => todo.id === viewModalData.id);

  // state
  const [toggleText, setToggleText] = useState(true);

  // short
  const titleText = viewTask[0].title.substring(0, 200);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 z-50 backdrop-blur-sm grid place-items-center overflow-auto">
      <div className="w-11/12 mx-auto max-w-[350px] md:max-w-[800px] bg-richblack-800 border-richblack-400 border rounded-lg p-6">
        {/* heading */}
        <div className="flex justify-between">
          <p className=" text-lg font-semibold">Task details (View)</p>
          <button
            onClick={() => setViewModalData(null)}
            className="text-2xl text-pink-200"
          >
            X
          </button>
        </div>

        {/* details */}
        <div className="mt-4 bg-richblack-700 px-4 py-2 rounded-t-md flex flex-col gap-2">
          {
            viewTask[0].title.length > 200 ? 
            (
                <p className="text-2xl break-all text-wrap transition-all duration-200">
            {toggleText ? viewTask[0].title : titleText} {" "}
            {toggleText ? (
              <span onClick={()=>setToggleText((prev)=>!prev)} className="text-lg text-pink-200 underline cursor-pointer">read less</span>
            ) : (
              <span onClick={()=>setToggleText((prev)=>!prev)} className="text-base text-pink-200 cursor-pointer underline">
                read more
              </span>
            )}
          </p>
            ) :
            (<p>{viewTask[0].title}</p>)
          }
          <p className="text-sm text-richblack-200 break-all text-wrap">
            {viewTask[0].description}
          </p>
          <div className="flex gap-2 items-center break-all text-wrap">
            <BsCalendarDate className="text-yellow-50 text-lg" />
            <p className="text-yellow-50">
              {formatedDueDate(viewTask[0].date)}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ViewModal;