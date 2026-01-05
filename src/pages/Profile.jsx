import '../styles/Profile.css';
import { useProfile } from '../hooks/useProfile';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Profile(){
    const { t } = useTranslation('userForm');
    const {
        user, 
        handleChange, 
        handleSubmit, 
        changePassword, 
        setChangePassword, 
        passwords, 
        setPasswords
    } = useProfile();
    
    return(
        <div className='profile-container'>
            <form onSubmit={handleSubmit}>
                <FormLabel required htmlFor='name'>{ t('name') }</FormLabel>
                <TextField
                    fullWidth
                    required
                    id='name'
                    name='name'
                    value={user?.name || ''}
                    onChange={handleChange}
                    size='small'
                    className='form-space-label'
                    slotProps={{htmlInput: {maxLength: 100}}}
                />

                <FormControl fullWidth required className='form-space-label'>
                    <FormLabel htmlFor='birth_date'>{ t('birthDate') }</FormLabel>
                    <TextField
                        id='birth_date'
                        type='date'
                        name='birth_date'
                        value={user?.birth_date || ''}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        size='small'
                    />
                </FormControl>

                <FormControl fullWidth required className='form-space-label'>
                    <FormLabel id='label-gender'>{ t('gender') }</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby='label-gender'
                        name='gender'
                        value={user?.gender || ''}
                        onChange={handleChange}
                    >
                    <FormControlLabel value='M' control={<Radio />} label={ t('male') } />
                    <FormControlLabel value='F' control={<Radio />} label={ t('female') } />
                    </RadioGroup>
                </FormControl>
                
                <FormLabel required htmlFor='role'>{ t('role') }</FormLabel>
                <TextField
                    disabled
                    fullWidth
                    name='role'
                    value={user?.role === 'patient' ? t('patient') : user?.role === 'caregiver' ? t('caregiver') : ''}
                    size='small'
                    className='form-space-label'
                />
                
                <FormLabel required htmlFor='email'>{ t('email') }</FormLabel>
                <TextField
                    fullWidth
                    required
                    type='email'
                    id='email'
                    name='email'
                    value={user?.email || ''}
                    onChange={handleChange}
                    size='small'
                    className='form-space-label'
                    slotProps={{htmlInput: {maxLength: 50}}}
                />

                <FormLabel required htmlFor='password'> {changePassword ? t('old_password') : t('password') } </FormLabel>
                <TextField
                    required
                    fullWidth
                    type='password'
                    id='password'
                    name='old_password'
                    value={changePassword ? passwords.old_password : '********'}
                    onFocus={() => {
                        if (!changePassword) {
                            setChangePassword(true);
                            setPasswords({ old_password: '', new_password: '' });
                        }
                    }}
                    onChange={(e) => {
                        if (changePassword) {
                            setPasswords(prev => ({ ...prev, old_password: e.target.value }));
                        }
                    }}
                    size='small'
                    className='form-space-label'
                    slotProps={{htmlInput: {minLength: 8, maxLength: 15}}}
                />

                {changePassword && (
                    <>
                        <FormLabel required htmlFor='new_password'>{ t('new_password') }</FormLabel>
                        <TextField
                            required
                            fullWidth
                            type='password'
                            id='new_password'
                            name='new_password'
                            value={passwords.new_password}
                            onChange={(e) => setPasswords(prev => ({ ...prev, new_password: e.target.value }))}
                            size='small'
                            className='form-space-label'
                            slotProps={{htmlInput: {minLength: 8, maxLength: 15}}}
                        />
                    </>
                )}

                <FormLabel htmlFor='doctor'>{ t('doctor') }</FormLabel>
                <TextField
                    fullWidth
                    id='doctor'
                    name='doctor'
                    value={user?.doctor || ''}
                    onChange={handleChange}
                    size='small'
                    className='form-space-label'
                    slotProps={{htmlInput: {maxLength: 100}}}
                />
                
                <Button type='submit' variant='contained' fullWidth>
                    { t('update') }
                </Button>
            </form>
        </div>
    );
};