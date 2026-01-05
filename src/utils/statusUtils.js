import i18n from '../config/i18n';

export const statusMessage = (status) => {
    switch(status){
        case 'success':
            return i18n.t('status.active');
        case 'error':
            return i18n.t('status.inactive');
        case 'primary':
            return i18n.t('status.upcoming');
        default:
            return i18n.t('status.no_info');
    }
}

export const statusMessageDecode = (status) => {
    switch(status){
        case i18n.t('status.active'):
            return 'success';
        case i18n.t('status.inactive'):
            return 'error';
        case i18n.t('status.upcoming'):
            return 'primary'; 
        default:
            return 'all';
    }
}