import React, { memo, useEffect, useState } from "react";
import Tab from "./Tab";
import { useSelector } from "react-redux";
import FilteredTaskList from "./FilteredTaskList";
import { GoSearch } from "react-icons/go";
import SearchModal from "../Common/SearchModal";
import CircularProgress from "./CircularProgress";

function CategoryTab() {
  // store
  const { task, filters } = useSelector((state) => state.tasks);

  // categories
  const categories = ["All", "Today", "Completed", "Pending", "Overdue"];

  // state
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchModal, setSearchModal] = useState(null);
  const [percentage,setPercentage] = useState(0);

  // filteredTask
  const filteredTasks = task.filter((todo) => {
    const today = new Date().toISOString().split("T")[0];
    const dueDate = new Date(todo.date).toISOString().split("T")[0];
    console.log(today)
    console.log(dueDate)

    if (filters === "Completed") {
      return todo.completed;
    } else if (filters === "Pending") {
      return !todo.completed && dueDate > today;
    } else if (filters === "Overdue") {
      return !todo.completed && dueDate < today;
    }
    else if (filters === "Today"){
      return today === dueDate ;
    }
    else {
      return todo;
    }
  });

  // calculate percentage
  useEffect(()=>{
    const totalTask = task.length;
    const completedTask = task.filter((todo)=>todo.completed);
    const totalCompletedTask = completedTask.length;
    
    const completedPercentage = Math.floor((totalCompletedTask/totalTask)*100);
    setPercentage(completedPercentage);
  },[task])

  return (
    <div className="mt-8">
      {/* search,categoryTab */}
      <div className="flex gap-6 lg:items-center lg:flex-row flex-col">
        {/* categories tab */}
        <div className="grid sm:flex border-0 rounded-lg bg-richblack-700 py-1 px-2 w-fit mt-4 grid-cols-2">
          {categories.map((category, idx) => (
            <Tab
              key={idx}
              category={category}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>

        {/* search */}
        <div className="mt-4">
          <button
            onClick={() =>
              setSearchModal({
                task,
              })
            }
            className="px-3 bg-yellow-50 text-richblack-900 rounded-lg py-1 text-lg flex items-center gap-2"
          >
            <GoSearch className="text-xl font-bold" />
            <p className="text-base font-semibold">Search Task</p>
          </button>
        </div>
      </div>

      {/* progressBar */}
      <div className="flex gap-4 items-center">
        <CircularProgress percentage={percentage} />
        <div className="flex flex-col gap-2 mt-8">
          {/* green */}
          <div className="flex gap-1 items-center">
            <div className="w-4 h-4 aspect-square bg-caribbeangreen-500"></div>
            <p className="text-sm text-richblack-50">Completed task</p>
          </div>
          {/* greys */}
          <div className="flex gap-1 items-center">
          <div className="w-4 h-4 aspect-square bg-pure-greys-600"></div>
          <p className="text-sm text-richblack-50">Incomplete task</p>
          </div>
        </div>
      </div>

      {/* Inbox */}
      <div className="mt-8">
        {/* heading */}
        <div className="text-2xl bg-gradient-to-r from-pink-100 to-yellow-50 w-fit text-transparent bg-clip-text">
          {`Inbox (${task.length} tasks)`}
        </div>

        {/* FilteredTasklist */}
        <FilteredTaskList filteredTasks={filteredTasks} />
      </div>

      {searchModal && (
        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      )}
    </div>
  );
}

export default memo(CategoryTab);
