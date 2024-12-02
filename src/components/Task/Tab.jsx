import React, { memo } from 'react'
import { useDispatch } from 'react-redux';
import { setFilters } from '../../store/slices/taskSlice';

function Tab({category,selectedCategory,setSelectedCategory}) {

  // hook
  const dispatch = useDispatch();

  return (
    <button onClick={()=>{
      setSelectedCategory(category);
      dispatch(setFilters(category));    
    }} className={`px-4 py-1 ${selectedCategory === category ? " bg-richblack-900 border-0 rounded-full text-white" : "text-richblack-50"}`}>
        {category}
    </button>
  )
}

export default memo(Tab);
