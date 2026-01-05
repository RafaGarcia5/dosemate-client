import '../styles/Medicament.css';
import '../styles/Card.css';
import { Card, CardContent, Button, Tooltip, Badge } from '@mui/material';
import { remainingDays, dateUser } from '../utils/dateOperations';
import { statusMessage } from '../utils/statusUtils';
import { useTranslation } from 'react-i18next';

export default function MedicamentCard({ medicament, onDelete, onUpdate }) {
    const { t } = useTranslation('medicament');
    const { t: tCommon } = useTranslation('common');

    const medicamentStatus = (start_date, end_date) =>{
        const { status, message } = remainingDays(start_date, end_date);
        return (
            <Tooltip title={statusMessage(status)} placement='right'>
                <Badge variant='dot' color={status}>
                    <p>{message}</p>
                </Badge>
            </Tooltip>
        );
    }

    return (
        <Card className='card-container' variant='outlined'>
            <CardContent>
                <div className='medicament-modal-info-card'>
                    <div className='medicament-modal-row-info'>
                        <h2>{medicament.name}</h2>
                        <p><b>{ t('info.dosage') }:</b> {medicament.dosage}</p>
                        <p><b>{ t('info.interval') }:</b> {medicament.interval_hours}</p>
                        <p><b>{ tCommon('date.start_date') }</b> {dateUser(medicament.start_date)}</p>
                        <p><b>{ tCommon('date.end_date') }:</b> {dateUser(medicament.end_date)}</p>
                        <p><b>{ t('info.comment') }:</b> {medicament?.comment || 'N/A'}</p>
                    </div>
                    <div className='medicament-modal-row-options'>
                        { medicamentStatus(medicament.start_date, medicament.end_date) }
                        {onUpdate && (
                        <Button variant='contained' size='small' onClick={() => onUpdate(medicament)} >{ tCommon('button.update') }</Button>)}
                        {onDelete && (
                        <Button variant='contained' color='error' size='small' onClick={() => onDelete(medicament)} >{ tCommon('button.delete') }</Button>)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
