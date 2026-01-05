import { jwtDecode } from 'jwt-decode';
import { logout, setToken } from './authSlice';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

let timer;

const tokenMiddleware = store => next => action => {
    if (action.type === setToken.type) {
        clearTimeout(timer);
        try {
            const { exp } = jwtDecode(action.payload);
            const expirationDelay = dayjs.unix(exp).diff(dayjs(), 'milliseconds');

            if (expirationDelay > 0) {
                timer = setTimeout(() => {
                    store.dispatch(logout());
                    toast.error('Your session has expired');
                }, expirationDelay);
            } else {
                store.dispatch(logout());
            }
        } catch (error) {
            console.error('Invalid token:', error);
            store.dispatch(logout());
        }
    }
    return next(action);
};

export default tokenMiddleware;
