import React, { useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { addTask } from "../../store/slices/taskSlice";
import toast from "react-hot-toast";
import { v4 as uuid } from "uuid";
import CategoryTab from "./CategoryTab";

function CreateTodo() {

  // hook
  const dispatch = useDispatch();

  // state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [selected, setSelected] = useState(false);

  // changeHandler
  function changeHandler(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
      <h2 className=" text-2xl">Today</h2>

      {/* createTodo */}
      <form onSubmit={submitHandler} className=" mt-8">
        <div className="flex gap-2 items-center">
          <div className="text-xl">Create Todo:</div>
          <div className="">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelected((prev) => !prev);
              }}
            >
              {selected ? (
                <p className="flex gap-1 items-center mt-3 border px-3 py-2 bg-yellow-50 text-richblack-900 font-semibold w-fit rounded-lg">
                  <CiCircleRemove className=" text-2xl font-extrabold" />
                  Cancel
                </p>
              ) : (
                <div className="flex gap-1 items-center border px-2 py-1 bg-yellow-50 text-richblack-900 font-semibold w-fit rounded-lg">
                  <MdOutlineCreateNewFolder className=" text-2xl font-bold" />
                  Add Todo
                </div>
              )}
            </button>
          </div>
        </div>

        {selected ? (
          <div className="border border-richblue-400 mt-20 rounded-md">
            <input
              className="bg-richblack-800 w-full outline-none px-4 py-3"
              required
              type="text"
              placeholder="title"
              onChange={changeHandler}
              name="title"
              value={formData.title}
            />
            <input
              className="bg-richblack-800 w-full outline-none px-4 py-3"
              required
              type="text"
              placeholder="description"
              onChange={changeHandler}
              name="description"
              value={formData.description}
            />
            <input
              className="bg-richblack-800 w-full outline-none px-4 py-3"
              required
              type="date"
              placeholder="pick a date"
              onChange={changeHandler}
              name="date"
              value={formData.date}
            />
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
