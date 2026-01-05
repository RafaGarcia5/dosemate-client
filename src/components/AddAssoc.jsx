import '../styles/Modal.css';
import { useAssocForm } from '../hooks/useAssocForm';
import { Modal, TextField, Button, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function AddAssoc({ open, onClose, onSubmit }) {
    const { t } = useTranslation('associates');
    const { t: tCommon } = useTranslation('common');
    const { id, handleChange, handleSubmit } = useAssocForm( onSubmit, onClose );
    
    return (
        <Modal open={open} onClose={onClose}>
            <div className='modal-container'>
                <h3>{ t('addAssoc.title') }</h3>
                <p>{ t('addAssoc.message') }</p>
                <form className='modal-form-container' onSubmit={handleSubmit}>
                    <FormLabel required htmlFor='assoc_id'>{ t('addAssoc.id') }</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id='assoc_id'
                        name='aasoc_id'
                        type='number'
                        value={id}
                        onChange={handleChange}
                        size='small'
                    />
                    <div className='modal-options'>
                        <Button variant='outlined' onClick={onClose}>{ tCommon('button.cancel') }</Button>
                        <Button variant='contained' type='submit'>{ tCommon('button.add') }</Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}