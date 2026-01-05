import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import '../styles/Dashboard.css';
import { NotificationProvider } from '../contexts/NotificationContext';
import LanguageSwitch from '../components/LanguageSwitch';

export default function Dashboard(){
    const userRole = useSelector((state) => state.auth.user?.role);
    return(
        <div className='dashboard-container'>
            <NotificationProvider>
                <Navbar role={userRole} />
                <div className='dashboard-outlet'>
                    <Outlet />
                </div>
                <div className='dashboard-switch-language'>
                    <LanguageSwitch />
                </div>
            </NotificationProvider>
        </div>
    );
};