import React, { memo, useState } from "react";
import Tab from "./Tab";
import { useSelector } from "react-redux";
import FilteredTaskList from "./FilteredTaskList";
import { FaSearch } from "react-icons/fa";
import SearchModal from "../Common/SearchModal";


function CategoryTab() {
  // store
  const { task, filters } = useSelector((state) => state.tasks);

  // categories
  const categories = ["All", "Completed", "Pending", "Overdue"];

  // state
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchModal, setSearchModal] = useState(null);

  // filteredTask
  const filteredTasks = task.filter((todo) => {
    const today = new Date();
    const dueDate = new Date(todo.date);

    if (filters === "Completed") {
      return todo.completed;
    } else if (filters === "Pending") {
      return !todo.completed && dueDate > today;
    } else if (filters === "Overdue") {
      return !todo.completed && dueDate < today;
    } else {
      return todo;
    }
  });

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
        <div className="mt-3">
          <button
            onClick={() =>
              setSearchModal({
                task,
              })
            }
            className="px-3 bg-yellow-50 text-richblack-900 rounded-lg py-1 text-lg flex items-center gap-2"
          >
            <FaSearch />
            <p className="text-lg font-semibold">Search Task</p>
          </button>
        </div>

      </div>

      {/* Inbox */}
      <div className="mt-8">

        {/* heading */}
        <div className="text-2xl bg-gradient-to-r from-pink-100 to-yellow-50 w-fit text-transparent bg-clip-text">
          Inbox
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
