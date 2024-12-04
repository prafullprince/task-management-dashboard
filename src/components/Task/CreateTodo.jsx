import React, { memo, useRef, useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/slices/taskSlice";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import CategoryTab from "./CategoryTab";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

function CreateTodo() {
  // hook
  const dispatch = useDispatch();

  // state
  const [selected, setSelected] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  // changeHandler
  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Change handler for DatePicker
  function handleDateChange(date) {
    setFormData((prev) => ({
      ...prev,
      date: date ? date.toISOString().split('T')[0] : '', // Store date as YYYY-MM-DD
    }));
  }

  // submitHandler
  function submitHandler(e) {
    e.preventDefault();

    const tid = toast.loading("Loading...");

    // validation
    if (!formData.title || !formData.description || !formData.date) {
      toast.error("All fields are required!");
      return;
    }

    // add in slice
    dispatch(
      addTask({
        id: uuid(),
        ...formData,
        completed: false,
      })
    );

    // after success
    toast.success("Task added successfully");
    toast.dismiss(tid);
    setFormData({
      title: "",
      description: "",
      date: "",
    });
    setSelected(false);
  }

  return (
    <div>
      {/* heading */}
      <h2 className=" text-2xl">Your task</h2>

      {/* createTodo */}
      <form onSubmit={submitHandler} className="mt-8">

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <div className="text-xl text-richblack-50">Create Task:</div>
          <div className="">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelected((prev) => !prev);
              }}
            >
              {selected ? (
                <p className="flex gap-1 items-center border px-2 py-1 bg-yellow-50 text-richblack-900 font-semibold w-fit rounded-lg">
                  <CiCircleRemove className=" text-2xl font-extrabold" />
                  Cancel
                </p>
              ) : (
                <div className="flex gap-1 items-center border px-2 py-1 bg-yellow-50 text-richblack-900 font-semibold w-fit rounded-lg">
                  <MdOutlineCreateNewFolder className=" text-2xl font-bold" />
                  Add Task
                </div>
              )}
            </button>
          </div>
        </div>

        {selected ? (
          <div className="border border-richblue-400 mt-20 rounded-md bg-richblack-800">

            {/* title */}
            <input
              className="bg-richblack-800 w-full outline-none px-4 py-3"
              required
              type="text"
              placeholder="title"
              onChange={changeHandler}
              name="title"
              value={formData.title}
            />

            {/* description */}
            <input
              className="bg-richblack-800 w-full outline-none px-4 py-3"
              required
              type="text"
              placeholder="description"
              onChange={changeHandler}
              name="description"
              value={formData.description}
            />

            {/* datePicker */}
            <div className="w-full flex items-center px-4 py-3 gap-2 cursor-pointer">
              <FaCalendarAlt />
              <DatePicker
                className="bg-richblack-800 w-full outline-none text-richblack-5 cursor-pointer"
                selected={formData.date ? new Date(formData.date) : null}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select due date"
              />
            </div>
            <div className=" w-full flex justify-end bg-richblack-800 mr-2 pb-2 pr-2">
              <button
                type="submit"
                className="px-2 py-1 border rounded-lg bg-yellow-50 text-richblack-900 font-medium text-lg"
              >
                Add task
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </form>

      {/* category-wise todo */}
      <CategoryTab />
    </div>
  );
}

export default CreateTodo;
