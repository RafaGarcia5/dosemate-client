import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function StatusFilter({ value, onChange }) {
        const { t } = useTranslation('common');

    return (
        <Select value={value} onChange={onChange} size="small">
            <MenuItem value="all">{ t('status.all') }</MenuItem>
            <MenuItem value="success">{ t('status.active') }</MenuItem>
            <MenuItem value="error">{ t('status.inactive') }</MenuItem>
            <MenuItem value="primary">{ t('status.upcoming') }</MenuItem>
        </Select>
    );
};
