import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { registerRequest } from '../services/authService';

const useRegister = () => {
    const navigate = useNavigate();

    const handleRegister = async (formData) => {
        try{
            const data = await registerRequest(formData);
            toast.success(data?.success || 'Successfully registered');
            navigate('/login');
        }catch(e){
            toast.error(e.response?.data?.message || 'Registration failed');
        }
    }

    return { handleRegister };
}

export { useRegister };