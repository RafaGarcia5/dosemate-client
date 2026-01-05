import '../styles/Lists.css';
import '../styles/Card.css';
import dayjs from 'dayjs';
import { Card, CardContent, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function PatientCard({ patient, onDelete, onDetails }) {
    const { t } = useTranslation('associates');
    const { t: tCommon } = useTranslation('common');
    const birth_date = patient.birth_date;
    const today = dayjs();
    const age = today.diff(dayjs(birth_date), 'year');

    return (
        <Card className='card-container' variant='outlined'>
            <CardContent>
                <div className='list-row'>
                    <div className='list-row-info'>
                        <h2>{patient.name}</h2>
                        <p>
                            <b>{ t('card.age') }: </b> {age} <br/>
                            <b>{ t('card.gender') }: </b> {patient.gender === 'M' ? t('card.male') : t('card.female') } <br/>
                            <b>{ t('card.email') }:</b> {patient.email} <br/>
                            <b>{ t('card.doctor') }: </b> {patient.doctor || 'N/A'}
                        </p>
                    </div>
                    <div className='list-row-options'>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => onDelete(patient)}
                            size='small'
                        >
                            { tCommon('button.delete') }
                        </Button>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={() => onDetails(patient)}
                        >
                            { tCommon('button.details') }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
