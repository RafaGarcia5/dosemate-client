import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { logoutRequest } from '../services/authService';

const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = async () => {
        await logoutRequest();
        dispatch(logout());
    };

    return {user, handleLogout};
};

export { useAuth };