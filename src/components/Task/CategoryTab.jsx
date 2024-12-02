import React, { memo, useState } from "react";
import Tab from "./Tab";
import { useSelector } from "react-redux";
import FilteredTaskList from "./FilteredTaskList";


function CategoryTab() {
    
  // store 
  const { task, filters } = useSelector((state) => state.tasks);

  // categories
  const categories = ["All", "Completed", "Pending", "Overdue"];

  // state   
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // filteredTask
  const filteredTasks = task.filter((todo) => {
    const today = new Date();
    const dueDate = new Date(task.date);

    if (filters === "All") {
      return todo;
    } else if (filters === "Completed") {
      return todo.completed;
    } else if (filters === "Pending") {
      return !todo.completed;
    } else if (filters === "Overdue") {
      return !todo.completed && dueDate < today;
    } else {
      return todo;
    }
  });

  return (
    <div className="mt-8">
      {/* heading */}
      <div className="text-lg">Your all todo by their category</div>

      {/* categories tab */}
      <div className="flex border-0 rounded-lg bg-richblack-700 py-1 px-2 w-fit mt-4">
        {categories.map((category, idx) => (
          <Tab
            key={idx}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>

      {/* Inbox*/}
      <div className=" mt-8">
        {/* heading */}
        <div className="text-xl">Inbox</div>

        {/* FilteredTasklist */}
        <FilteredTaskList filteredTasks={filteredTasks} />
      </div>
    </div>
  );
}

export default memo(CategoryTab);
