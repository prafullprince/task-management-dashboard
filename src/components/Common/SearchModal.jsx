import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function SearchModal({ searchModal, setSearchModal }) {

  // hook
  const navigate = useNavigate(); 

  // state
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  // searchHandler
  function searchHandler(e) {
    const query = e.target.value;
    setSearch(query);

    const searchTasks = searchModal.task.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestion(searchTasks);
  }


  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 grid place-items-center backdrop-blur-sm z-50 overflow-auto">
      <div className="w-11/12 mx-auto max-w-[350px] md:max-w-[800px] bg-richblack-800 border-richblack-400 p-6 rounded-lg">

        {/* search */}
        <div className="w-full min-h-[700px] relative">
          <FaSearch className=" absolute top-[14px] left-3 text-xl" />
          <input
            type="text"
            name="search"
            value={search}
            onChange={searchHandler}
            placeholder="Search or type a command..."
            className="w-full bg-richblack-900 outline-none rounded-t-lg h-12 px-10 text-lg placeholder:text-richblack-5 text-richblack-5"
          />

          {/* searchResult */}
          {search && suggestion.length > 0 && (
            <div className="w-full bg-richblack-50 text-richblack-900 py-3 flex flex-col gap-2 rounded-b-lg">
              {suggestion.map((data) => (
                <Link to={`/taskDetails/${data.id}`} key={data.id} className="px-4 py-1 cursor-pointer hover:bg-richblack-700 hover:text-richblack-5 text-richblack-900 text-lg rounded-lg mx-4 transition-all duration-200 break-all text-wrap">
                  {data.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* cancel */}
        <div className="w-full flex justify-end">
          <button
            onClick={() => setSearchModal(null)}
            className="text-lg px-2 py-1 bg-yellow-50 text-richblack-900 font-semibold rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
