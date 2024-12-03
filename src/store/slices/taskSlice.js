import { createSlice } from "@reduxjs/toolkit";

// initialState
const initialState = {
    task: localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : [],
    filters: localStorage.getItem("category") ? JSON.parse(localStorage.getItem("category")) : "All"
}

// creating slice
const taskSlice = createSlice({
    name:"tasks",
    initialState:initialState,
    reducers:{
        addTask(state,action){
            state.task.push(action.payload);
            localStorage.setItem("todo",JSON.stringify(state.task));
        },
        setFilters(state,action){
            state.filters = action.payload;
            localStorage.setItem("category",JSON.stringify(state.filters));
        },
        deleteTask(state,action){
            state.task = state.task.filter((todo)=>
                todo.id !== action.payload
            );
            localStorage.setItem("todo",JSON.stringify(state.task));
        },
        toggleTaskCompleted(state,action){
            const task = state.task.find((todo)=> todo.id === action.payload);
            if(task){
                task.completed = !task.completed
            }
            localStorage.setItem("todo",JSON.stringify(state.task));
        }
    }
});

// export reducers function
export const {addTask,setFilters,toggleTaskCompleted,deleteTask} = taskSlice.actions;
// export taskReducer reducer
export default taskSlice.reducer;
