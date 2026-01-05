import { Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitch.css';

export default function LanguageSwitch() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
        // localStorage.setItem('i18nextLng', newLang);
    };

    return (
        <div className='switch-container'>
            <p className={i18n.language === 'en' ? 'switch-selected' : 'switch-no-selected'}>EN</p>
            <Switch
                checked={i18n.language === 'es'}
                onChange={toggleLanguage}
                color="primary"
            />
            <p className={i18n.language === 'es' ? 'switch-selected' : 'switch-no-selected'}>ES</p>
        </div>
    );
}
