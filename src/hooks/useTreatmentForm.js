import { useState, useEffect } from 'react';
import { dateRange, today } from '../utils/dateOperations';

const useTreatmentForm = (onSubmit, onClose, initialData=null) => {
    const [formData, setFormData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        comment: ''
    });
    const [dateError, setDateError] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
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
            onSubmit(formData);
            onClose();
            setFormData({ name: '', start_date: '', end_date: '', comment: '' });
        }
    };

    return { formData, dateError, today, handleChange, handleSubmit };
}

export { useTreatmentForm };