import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, updateProfile } from '../services/profileService';

const useProfile = () => {
    const userId = useSelector((state) => state.auth.user?.id);
    const [originalUser, setOriginalUser] = useState(null);
    const [user, setUser] = useState(null);
    const [changePassword, setChangePassword] = useState(false);
    const [passwords, setPasswords] = useState({ old_password: '', new_password: ''});

    const getUser = async () => {
        try{
            const data = await getProfile();
            setOriginalUser(data);
            setUser(data);
        }catch(e){
            toast.error(e.response?.data?.message || 'Update information operation failed');
        }
    }

    useEffect(() =>{
        if(userId){
            getUser();
        }
    },[]);

    const handleChange = (e) =>{
        setUser( prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const changedFields = {};
        for (const key in user) {
            if (user[key] !== originalUser[key]) {
                changedFields[key] = user[key];
            }
        }

        if (changePassword) {
            changedFields.old_password = passwords.old_password;
            changedFields.new_password = passwords.new_password;
        }

        if (Object.keys(changedFields).length === 0) {
            toast.info('No changes to update');
            return;
        }

        try{
            const response = await updateProfile(changedFields);
            toast.success(response?.success || 'Successfully updated');
            setChangePassword(false);
            setPasswords({ old_password: '', new_password: '' });
            await getUser();
        }catch(e){
            toast.error(e.response?.data?.message || 'Update information operation failed');
        }
    }

    return { user, handleChange, handleSubmit, changePassword, setChangePassword, passwords,setPasswords };
};

export { useProfile };