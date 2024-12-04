import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Task from './pages/Task'


function App() {

  return (
    <div className='bg-richblack-900 min-h-screen text-white overflow-x-hidden'>

      <Routes>

        <Route path='/' element={<Navigate to={"/tasks"} />} />

        <Route element={<Dashboard />} >
          <Route path='/tasks' element={<Task />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
