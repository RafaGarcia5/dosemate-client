import { useState } from 'react';

const useAssocForm = (onSubmit, onClose) => {
    const [id, setId] = useState('');

    const handleChange = (e) => {
        setId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(id);
        onClose();
        setId('');
    };

    return { id, handleChange, handleSubmit };
}

export { useAssocForm };