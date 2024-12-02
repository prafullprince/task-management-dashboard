import React from "react";
import CreateTodo from "../components/Task/CreateTodo";


function TodayTask() {
  return (
    <div>
      <div className="w-[90%] mx-auto">
        {/* create todo */}
        <CreateTodo />
      </div>
    </div>
  );
}

export default TodayTask;
