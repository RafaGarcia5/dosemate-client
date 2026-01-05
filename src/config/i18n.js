import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        ns: ['associates', 'common', 'login', 'mainPage', 'medicament', 'navbar', 'track', 'treatment', 'userForm'],
        defaultNS: 'common',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        react: {
            useSuspense: false
        }
    });
export default i18n;
