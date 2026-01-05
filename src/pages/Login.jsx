import '../styles/Login.css';
import { useState } from 'react';
import { TextField, Button} from '@mui/material';
import { Link } from 'react-router';
import { useLogin } from '../hooks/useLogin';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../components/LanguageSwitch';

export default function Login(){
    const { t } = useTranslation('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { handleLogin } = useLogin();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await handleLogin({ email, password, onError: setError });

        if(setError){
            setLoading(false);
        }
    };

    return(
        <div className='login-container'>
            <div className='switch-language'>
                <LanguageSwitch/>
            </div>

            <div>
                <h1>{ t('welcome') }</h1>
                <p><b>{ t('loginToYourAccount') }</b></p>
            </div>
            <form className='login-form' onSubmit={onSubmit}>
                <TextField 
                    fullWidth
                    required
                    id='email' 
                    label={t('email')}
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size='small'
                    error={error}
                    className='login-form-top-space login-form-bottom-space'
                    slotProps={{htmlInput: {maxLength: 50}}}
                />
                
                <TextField
                    fullWidth
                    required
                    id='password'
                    label={t('password')}
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    size='small'
                    error={error}
                    className='login-form-bottom-space'
                    slotProps={{htmlInput: {minLength: 8, maxLength: 15}}}
                />
                <Button variant='contained' type='submit' fullWidth loading={loading} loadingPosition='end'>
                    {t('login')}
                </Button>
            </form>
            <p> {t('registerPrompt')} <Link to='/register'>{t('register')}</Link></p>
        </div>
    );
}