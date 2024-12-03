import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import TaskPageDetails from './pages/TaskPageDetails'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'

function App() {

  return (
    <div className='bg-richblack-900 w-screen min-h-screen text-white overflow-x-hidden'>

      <Routes>

        <Route path='/' element={<Navigate to={"/tasks"} />} />

        <Route element={<Dashboard />} >
          <Route path='/tasks' element={<Task />} />
          <Route path='/todayTasks' element={<TaskPageDetails />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
