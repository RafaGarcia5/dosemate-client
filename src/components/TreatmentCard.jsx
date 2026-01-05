import '../styles/Card.css';
import { Card, CardActionArea, CardContent, Button, Badge, Tooltip } from '@mui/material';
import { remainingDays, dateUser } from '../utils/dateOperations';
import { statusMessage } from '../utils/statusUtils';
import { useTranslation } from 'react-i18next';

export default function TreatmentCard({treatment, handleCardClick, onDelete, onUpdate}){
    const { t } = useTranslation('common');

    const treatmentStatus = (start_date, end_date) =>{
        const { status, message } = remainingDays(start_date, end_date);
        return (
            <Tooltip title={statusMessage(status)} placement='right'>
                <Badge variant='dot' color={status}>
                    <p>{message}</p>
                </Badge>
            </Tooltip>
        );
    }

    return(
        <Card className='card-container' key={treatment.id} variant='outlined'>
            <CardContent>
                <div className='list-row'>
                    <div className='list-row-info'>
                        <CardActionArea onClick={() => handleCardClick(treatment)}>
                            <h2>{treatment.name}</h2>
                            <p><b>{ t('date.start_date') }:</b> {dateUser(treatment.start_date)}</p>
                            <p><b>{ t('date.end_date') }:</b> {dateUser(treatment.end_date)}</p>
                            <p><b>{ t('form.comment') }:</b> {treatment?.comment || 'N/A'}</p>
                        </CardActionArea>
                    </div>
                    <div className='list-row-options'>
                        { treatmentStatus(treatment.start_date, treatment.end_date) }
                        {(onDelete && onUpdate) && (
                            <>
                                <Button variant='contained' size='small' onClick={() => onUpdate(treatment)} >{ t('button.update') }</Button>
                                <Button variant='contained' color='error' size='small' onClick={() => onDelete(treatment)} >{ t('button.delete') }</Button>
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}