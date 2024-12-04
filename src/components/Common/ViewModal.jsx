import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsCalendarDate } from "react-icons/bs";
import { formatedDueDate } from "../../helper/formatedDate";

function ViewModal({ viewModalData, setViewModalData }) {

  // hook
  const { task } = useSelector((state) => state.tasks);

  // State
  const [viewTask, setViewTask] = useState(null);
  const [toggleText, setToggleText] = useState(true);

  // Filter task to get the current one whenever task or viewModalData changes
  useEffect(() => {
    const currentTask = task.find((todo) => todo.id === viewModalData.id);
    setViewTask(currentTask);
  }, [task, viewModalData]);

  if (!viewTask) return null;

  // task status
  const today = new Date().toISOString().split("T")[0];
  const dueDate = new Date(viewTask.date).toISOString().split("T")[0];
  const taskStatus = viewTask.completed
    ? "Completed"
    : dueDate < today
    ? "Overdue"
    : "Pending";


  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 z-50 backdrop-blur-sm grid place-items-center overflow-auto">
      <div className="w-11/12 mx-auto max-w-[350px] md:max-w-[800px] bg-richblack-800 border-richblack-400 border rounded-lg p-6">
        {/* Heading */}
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Task details (View)</p>

          {/* Task Status */}
          <div className="hidden sm:block">
            <div
              className={`flex text-lg gap-1 items-center ${
                taskStatus === "Completed"
                  ? "bg-gradient-to-r from-yellow-50 to-caribbeangreen-50"
                  : taskStatus === "Overdue"
                  ? "bg-gradient-to-r from-pink-200 to-pink-100"
                  : "bg-gradient-to-r from-pink-300 to-blue-200"
              } text-transparent bg-clip-text`}
            >
              {taskStatus}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setViewModalData(null)}
            className="text-2xl text-pink-200"
          >
            X
          </button>
        </div>

        {/* Task Details */}
        <div className="mt-4 bg-richblack-700 px-4 py-2 rounded-t-md flex flex-col gap-2">
          {/* Title */}
          {viewTask.title.length > 200 ? (
            <p className="text-2xl break-all text-wrap transition-all duration-200">
              {toggleText ? viewTask.title : viewTask.title.substring(0, 200)}{" "}
              <span
                onClick={() => setToggleText((prev) => !prev)}
                className="text-lg text-pink-200 underline cursor-pointer"
              >
                {toggleText ? "read less" : "read more"}
              </span>
            </p>
          ) : (
            <p>{viewTask.title}</p>
          )}

          {/* Description */}
          <p className="text-sm text-richblack-200 break-all text-wrap">
            {viewTask.description}
          </p>

          {/* Due Date */}
          <div className="flex gap-2 items-center break-all text-wrap">
            <BsCalendarDate className="text-yellow-50 text-lg" />
            <p className="text-yellow-50">{formatedDueDate(viewTask.date)}</p>
          </div>
        </div>

        {/* Status for small screens */}
        <div className="sm:hidden mt-4">
          <div
            className={`flex text-lg gap-1 items-center ${
              taskStatus === "Completed"
                ? "bg-gradient-to-r from-yellow-50 to-caribbeangreen-50"
                : taskStatus === "Overdue"
                ? "bg-gradient-to-r from-pink-200 to-pink-100"
                : "bg-gradient-to-r from-pink-300 to-blue-200"
            } text-transparent bg-clip-text`}
          >
            {taskStatus}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
