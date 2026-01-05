import { useDispatch } from 'react-redux';
import { login, setToken } from '../redux/authSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { loginRequest } from '../services/authService';

const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async ({email, password, onError}) => {
        try {
            const data = await loginRequest(email, password);
            dispatch(login(data.user));
            dispatch(setToken(data.token));
            navigate('/dashboard');
            onError(false);
        }catch(e){
            toast.error(e.response?.data?.message || 'Login failed');
            onError(true);
        }
    };
    return { handleLogin };
}

export { useLogin };