import { useSelector, useDispatch } from "react-redux";
import { tokenExpired } from '../utils/dateOperations';
import { useEffect } from "react";
import { logout } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";

export const useToken = () => {
    const token = useSelector((state) => state.auth?.token);
    const decode = jwtDecode(token);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(token);
            if(tokenExpired(decode.exp)){
                dispatch(logout());
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [token]);

    return { token };
}