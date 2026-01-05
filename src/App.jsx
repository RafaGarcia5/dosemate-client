import './styles/App.css';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Treatment from './pages/Treatment';
import Associates from './pages/AssocList';
import Track from './pages/Track';
import PatientMainPage from './pages/PatientMainPage';
import CaregiverMainPage from './pages/CaregiverMainPage';

function ProtectedRoute({children}) { 
  const token = useSelector((state) => state.auth.token);
  return token ? children: <Navigate to='/login' />;
}

export default function App() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className='app-container'>
      <ToastContainer position='bottom-right' theme='colored' autoClose={3000} />
      <Router>
        <Routes>
          <Route path='/' element={token ? <Navigate to='/dashboard' /> : <Navigate to='/login' /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> }>
            <Route index element={ user?.role === 'patient' ? <PatientMainPage /> : <CaregiverMainPage /> } />
            <Route path='mainPage' element={ user?.role ==='patient' ? <PatientMainPage /> : <CaregiverMainPage /> } />
            <Route path='schedule' element={<Track />} />
            <Route path='treatment' element={<Treatment />} />
            <Route path='patientList' element={<Associates />} />
            <Route path='caregiverList' element={<Associates />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );  
}


