import '../styles/Modal.css';
import { useMedicamentForm } from '../hooks/useMedicamentForm';
import { Modal, TextField, Button, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function MedicamentForm({ open, onClose, onSubmit, initialData=null, isEdit=false}) {
    const { t } = useTranslation('medicament');
    const { t: tCommon } = useTranslation('common');

    const { 
        formData, 
        dateError, 
        today, 
        handleChange, 
        handleSubmit 
    } = useMedicamentForm( onSubmit, onClose, initialData);

    return (
        <Modal open={open} onClose={onClose}>
            <div className='modal-container'>
                <h3>{isEdit ? t('title.edit') : t('title.new') }</h3>
                <form className='modal-form-container' onSubmit={handleSubmit}>
                    <FormLabel required htmlFor='name'>{ t('info.name') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        size='small'
                        slotProps={{htmlInput: {maxLength: 50}}}
                    />

                    <FormLabel required htmlFor='dosage'>{ t('info.dosage') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='dosage'
                        name='dosage'
                        value={formData.dosage}
                        onChange={handleChange}
                        size='small'
                        slotProps={{htmlInput: {maxLength: 20}}}
                    />

                    <FormLabel required htmlFor='interval_hours'>{ t('info.interval') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='interval_hours'
                        name='interval_hours'
                        type='number'
                        value={formData.interval_hours}
                        onChange={handleChange}
                        size='small'
                    />

                    <FormLabel required htmlFor='start_date'>{ tCommon('date.start_date') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='start_date'
                        type='datetime-local'
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

                    <FormLabel htmlFor='comment'>{ t('info.comment') }</FormLabel>
                    <TextField
                        fullWidth
                        id='comment'
                        name='comment'
                        value={formData.comment}
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