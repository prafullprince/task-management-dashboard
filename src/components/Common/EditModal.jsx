import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../store/slices/taskSlice";
import toast from "react-hot-toast";

function EditModal({ editModalData, setEditModalData }) {

  // hook
  const dispatch = useDispatch();
  const {task} = useSelector((state)=>state.tasks);
  const currentTask = task.filter((todo)=> todo.id === editModalData.id);

  // state
  const [formData, setFormData] = useState({
    title: `${currentTask[0].title}`,
    description: `${currentTask[0].title}`,
    date: `${currentTask[0].title}`,
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
      editTask({
        id: editModalData.id,
        ...formData,
        completed: false,
      })
    );

    // after success
    toast.success("Task edited successfully");
    toast.dismiss(tid);
    setFormData({
      title: "",
      description: "",
      date: "",
    });
    setEditModalData(null);
  }

  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 grid place-items-center backdrop-blur-sm z-50 overflow-auto">
      <div className="w-11/12 mx-auto max-w-[350px] md:max-w-[800px] bg-richblack-800 border-richblack-400 p-6 rounded-lg">
        {/* topBar */}
        <div className="flex justify-between items-center">
          <div className=" text-xl">Edit Task</div>
          <button
            onClick={() => setEditModalData(null)}
            className="text-2xl text-pink-200"
          >
            X
          </button>
        </div>

        {/* EditTask */}
        <form onSubmit={submitHandler} className="mt-1">
            <div className="border border-richblue-400 mt-20 rounded-md">
              <input
                className="bg-richblack-800 w-full outline-none px-4 py-3 text-richblack-5 text-lg"
                required
                type="text"
                placeholder="title"
                onChange={changeHandler}
                name="title"
                value={formData.title}
              />
              <input
                className="bg-richblack-800 w-full outline-none px-4 py-3 text-richblack-50 text-sm"
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
              <div className=" w-full flex justify-end bg-richblack-800 mr-2 pb-2 pr-2 mt-2">
                <button
                  type="submit"
                  className="px-2 py-1 border rounded-lg bg-yellow-50 text-richblack-900 font-medium text-lg"
                >
                  Edit
                </button>
              </div>
            </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
