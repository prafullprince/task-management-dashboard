import React, { memo, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompleted } from "../../store/slices/taskSlice";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
import ConfirmationModal from "../Common/ConfirmationModal";
import ViewModal from "../Common/ViewModal";
import { BsCalendar } from "react-icons/bs";
import { formatedDueDate } from "../../helper/formatedDate";
import EditModal from "../Common/EditModal";

function FilteredTaskList({ filteredTasks }) {
  
  // hook
  const dispatch = useDispatch();

  // state
  const [modalData, setModalData] = useState(null);
  const [viewModalData, setViewModalData] = useState(null);
  const [editModalData, setEditModalData] = useState(null);

  // completed task handler
  function completeHandler(e, id) {
    dispatch(toggleTaskCompleted(id));
    e.stopPropagation();
  }

  // deleteHandler
  function deleteHandler(e, id) {
    setModalData({
      text1: "Are you sure ?",
      text2: "Your task will be deleted.",
      btn1Text: "Cancel",
      btn2Text: "Delete",
      btn2Handler: () => {
        dispatch(deleteTask(id));
        setModalData(null);
      },
      btn1Handler: () => setModalData(null),
    });
    e.stopPropagation();
  }

  // viewHandler
  function viewHandler(id) {
    setViewModalData({ id });
  }

  // editHandler
  function editHandler(e, id) {
    setEditModalData({ id });
    e.stopPropagation();
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredTasks?.length === 0 ? (
        <div className="mt-6">No task found</div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {filteredTasks?.map((filteredTodo) => (
            <div
              onClick={() => viewHandler(filteredTodo.id)}
              key={filteredTodo.id}
              className="flex flex-col gap-6 bg-richblack-700 border-0 rounded-xl px-4 py-4 hover:bg-richblack-800 transition-all duration-200 cursor-pointer"
            >
              {/* content */}
              <div className="flex justify-between">
                {/* left */}
                <div className="flex gap-6">
                  {/* mark as div */}
                  <div
                    onClick={(e) => {
                      completeHandler(e, filteredTodo.id);
                    }}
                    className={`w-6 h-6 mt-2 aspect-square border-[0.2px] rounded-sm sm:flex hidden justify-center items-center cursor-pointer ${
                      filteredTodo.completed ? "bg-blue-50 border-blue-100" : ""
                    }`}
                  >
                    {filteredTodo?.completed ? (
                      <FaCheck className="font-semibold text-lg text-black" />
                    ) : null}
                  </div>
                  {/* content */}
                  <div className="flex flex-col gap-1">
                    {filteredTodo?.title.length > 100 ? (
                      <p className="text-richblack-5 text-lg break-all text-wrap">
                        {filteredTodo?.title.substring(0, 100)}
                        <span className="text-blue-50">.......</span>
                      </p>
                    ) : (
                      <p className="text-richblack-5 text-lg break-all text-wrap">
                        {filteredTodo?.title}
                      </p>
                    )}
                    <p className="text-richblack-50 text-sm break-all text-wrap">
                      {filteredTodo?.description}
                    </p>
                    <div className="flex gap-2 items-center text-sm break-all text-wrap">
                      <BsCalendar className="text-yellow-50" />
                      <p className="text-yellow-50">
                        {formatedDueDate(filteredTodo.date)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* right */}
                <div className="flex gap-2 flex-col sm:flex-row sm:items-center sm:gap-2">
                  <button onClick={(e) => completeHandler(e, filteredTodo.id)}>
                    <IoCheckmarkDone
                      className={`text-3xl ${
                        filteredTodo.completed
                          ? "text-caribbeangreen-200"
                          : "hover:text-caribbeangreen-200"
                      }`}
                    />
                  </button>
                  <button onClick={(e) => editHandler(e, filteredTodo.id)}>
                    <CiEdit className="text-3xl hover:text-yellow-200 transition-all duration-200" />
                  </button>
                  <button onClick={(e) => deleteHandler(e, filteredTodo.id)}>
                    <MdDelete className="text-3xl hover:text-pink-200 transition-all duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal */}
      {modalData && (
        <ConfirmationModal modalData={modalData} setModalData={setModalData} />
      )}
      {viewModalData && (
        <ViewModal
          viewModalData={viewModalData}
          setViewModalData={setViewModalData}
        />
      )}
      {editModalData && (
        <EditModal
          editModalData={editModalData}
          setEditModalData={setEditModalData}
        />
      )}
    </div>
  );
}

export default memo(FilteredTaskList);
