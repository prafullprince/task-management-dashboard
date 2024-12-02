import React, { memo } from "react";
import { FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toggleTaskCompleted } from "../../store/slices/taskSlice";

function FilteredTaskList({ filteredTasks }) {
    
  // hook
  const dispatch = useDispatch();

  // completed task handler
  function completeHandler(id) {
    dispatch(toggleTaskCompleted(id));
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredTasks?.length === 0 ? (
        <div>No task found</div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {filteredTasks?.map((filteredTodo, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              {/* content */}
              <div className="flex gap-2">
                {/* mark as div */}
                <div
                  onClick={() => {
                    completeHandler(filteredTodo.id);
                  }}
                  className="w-6 h-6 border-[0.2px] rounded-full flex justify-center items-center cursor-pointer"
                >
                  {filteredTodo?.completed ? (
                    <FaCheck className=" font-thin text-yellow-50" />
                  ) : null}
                </div>
                {/* content */}
                <div className="flex flex-col gap-1">
                  <p className="text-richblack-50 text-lg">
                    {filteredTodo?.title}
                  </p>
                  <p className=" text-richblack-5 text-sm">
                    {filteredTodo?.description}
                  </p>
                  <p>{filteredTodo?.date}</p>
                </div>
              </div>
              {/* underline */}
              <div className="w-full h-1 border-b-[0.2px] border-richblack-600"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(FilteredTaskList);
