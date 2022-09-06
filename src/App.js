import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
// styles
import './App.css';

// pages and components
import Create from './pages/create/Create'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Project from './pages/project/Project'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers';

function App() {
  const { authIsReady, user } = useAuthContext()
  console.log(authIsReady)
  return (
    <div className="App">
     {authIsReady && ( 
     <BrowserRouter>
     {user && <Sidebar />}
      <div className="container">
        <Navbar />
        <Routes>
          <Route path='/' element={!user ? 
            <Navigate to='/login' replace /> : <Dashboard />
          } />
          <Route path='/create' element={!user ?
            <Navigate to='/login' replace /> : <Create />
          } />
          <Route path='/projects/:id' element={!user ? 
            <Navigate to='/login' replace /> : <Project />
          } />
          <Route path='/login' element={user ? 
            <Navigate to='/' replace /> : <Login />
          } />
          <Route path='/signup' element={user ? 
            <Navigate to='/' replace /> : <Signup />
          } />
        </Routes>
      </div>
      {user && <OnlineUsers />}
     </BrowserRouter> 
    )}
    </div>
  );
}

export default App;

/*
  - dashboard (homepage)
  - login
  - singup
  - create
  - project (project details)
 */