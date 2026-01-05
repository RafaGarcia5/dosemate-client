import '../styles/Register.css';
import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import { Link } from 'react-router';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../components/LanguageSwitch';

export default function Register(){
    const { t } = useTranslation('userForm');
    const { handleRegister } = useRegister();
    const [formData,  setFormData] = useState({
        name : '',
        birth_date : '',
        gender : 'M',
        email : '',
        password : '',
        role : 'patient',
        doctor : '' 
    });

    const handleChange = (e) =>{
        setFormData( prev => ({ ...prev, [e.target.name] : e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister(formData);
    }

    return(
        <div className='register-container'>
            <div className='register-switch-language'>
                <LanguageSwitch/>
            </div>

            <h1 className='register-title'>{t('title')}</h1>
            <form className='register-form' onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    required
                    label={t('name')}
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='register-form-space'
                    slotProps={{htmlInput: {maxLength: 100}}}
                />

                <FormControl fullWidth required className='register-form-space'>
                    <FormLabel htmlFor='birth_date'>{t('birthDate')}</FormLabel>
                    <TextField
                    id='birth_date'
                    type='date'
                    name='birth_date'
                    value={formData.birth_date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    />
                </FormControl>

                <FormControl fullWidth required className='register-form-space'>
                    <FormLabel id='label-gender'>{t('gender')}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby='label-gender'
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange}
                    >
                    <FormControlLabel value='M' control={<Radio />} label={t('male')} />
                    <FormControlLabel value='F' control={<Radio />} label={t('female')} />
                    </RadioGroup>
                </FormControl>

                <TextField
                    fullWidth
                    required
                    type='email'
                    label={t('email')}
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='register-form-space'
                    slotProps={{htmlInput: {maxLength: 50}}}
                />

                <TextField
                    fullWidth
                    required
                    type='password'
                    label={t('password')}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='register-form-space'
                    slotProps={{htmlInput: {maxLength: 50}}}
                />

                <FormControl fullWidth required className='register-form-space'>
                    <FormLabel id='label-role'>{t('role')}</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby='label-role'
                        name='role'
                        value={formData.role}
                        onChange={handleChange}
                    >
                    <FormControlLabel value='patient' control={<Radio />} label={t('patient')} />
                    <FormControlLabel value='caregiver' control={<Radio />} label={t('caregiver')} />
                    </RadioGroup>
                </FormControl>

                <TextField
                    fullWidth
                    label={t('doctor')}
                    name='doctor'
                    value={formData.doctor}
                    onChange={handleChange}
                    className='register-form-space'
                    slotProps={{htmlInput: {maxLength: 100}}}
                />
                
                <Button type='submit' variant='contained' fullWidth>
                   {t('register')}
                </Button>
            </form>
            <p className='register-with-account'> {t('haveAccount')} <Link to='/login'>{t('login')}</Link></p>
        </div>
    );
}