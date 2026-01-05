import '../styles/Modal.css';
import { useTreatmentForm } from '../hooks/useTreatmentForm';
import { Modal, TextField, Button, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function TreatmentForm({ open, onClose, onSubmit, initialData=null, isEdit=false}) {
    const { t } = useTranslation('treatment');
    const { t: tCommon } = useTranslation('common');


    const { 
        formData, 
        dateError, 
        today, 
        handleChange, 
        handleSubmit 
    } = useTreatmentForm( onSubmit, onClose, initialData);
    
    return (
        <Modal open={open} onClose={onClose}>
            <div className='modal-container'>
                <h3>{isEdit ? t('title.edit') : t('title.new') }</h3>
                <form className='modal-form-container' onSubmit={handleSubmit}>
                    <FormLabel required htmlFor='name'>{ tCommon('form.name') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        size='small'
                        slotProps={{htmlInput: {maxLength: 100}}}

                    />

                    <FormLabel required htmlFor='start_date'>{ tCommon('date.start_date') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='start_date'
                        type='date'
                        name='start_date'
                        value={formData.start_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        size='small'
                        inputProps={!isEdit ? {min: today} : {}}
                    />

                    <FormLabel required htmlFor='end_date'>{ tCommon('date.end_date') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='end_date'
                        type='date'
                        name='end_date'
                        value={formData.end_date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        error={dateError}
                        helperText={dateError ? 'End date must be later' : ''}
                        size='small'
                        inputProps={{min: formData.start_date || today}}
                    />

                    <FormLabel htmlFor='comment'>{ tCommon('form.comment') }</FormLabel>
                    <TextField
                        fullWidth
                        id='comment'
                        name='comment'
                        value={formData?.comment || ''}
                        onChange={handleChange}
                        multiline
                        rows={2}
                        size='small'
                        slotProps={{htmlInput: {maxLength: 250}}}

                    />
                    <div className='modal-options'>
                        <Button variant='outlined' onClick={onClose}>{ tCommon('button.cancel') }</Button>
                        <Button variant='contained' type='submit'>{isEdit ? tCommon('button.update') : tCommon('button.add')}</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}