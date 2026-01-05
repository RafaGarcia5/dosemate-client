import { useState, useEffect } from 'react';
import { dateRange, today } from '../utils/dateOperations';
import dayjs from 'dayjs';

const useMedicamentForm = (onSubmit, onClose, initialData=null) => {
    const initialFormData = {
        name: '',
        dosage : '',
        interval_hours: 0,
        start_date: '',
        end_date: '',
        comment: ''
    }

    const [formData, setFormData] = useState(initialFormData);
    const [dateError, setDateError] = useState(false);

    const formatToDatetimeLocal = (date) => {
        return dayjs(date).format('YYYY-MM-DDTHH:mm');
    };

    const formatForBackend = (date) => {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                start_date: formatToDatetimeLocal(initialData.start_date)
            });
        }
    }, [initialData]);

    const handleChange = (e) =>{
        setFormData( prev => ({ ...prev, [e.target.name] : e.target.value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isError = dateRange(formData.start_date, formData.end_date);
        setDateError(isError);

        if (!isError) {
            const formattedData = {
                ...formData,
                start_date: formatForBackend(formData.start_date)
            };
            onSubmit(formattedData);
            onClose();
            setFormData(initialFormData);
        }
    };

    return { formData, dateError, today, handleChange, handleSubmit };
}

export { useMedicamentForm };