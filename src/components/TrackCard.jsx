import '../styles/Lists.css';
import '../styles/Card.css';
import { Card, CardContent, Button } from '@mui/material';
import { dateTimeUser } from '../utils/dateOperations';
import { useTranslation } from 'react-i18next';

export default function TrackCard({ track, onUpdate }){
    const { t } = useTranslation('track');
    const taked = track.taken_dose === 1;
    return (
        <Card className='card-container' variant='outlined'>
            <CardContent>
                <div className='list-row'>
                    <div className='list-row-info'>
                        <h2>{track.medicament_name}</h2>
                        <p><b>{ t('info.schedule') }:</b> {dateTimeUser(track.schedule)}</p>
                        <p><b>{ t('info.treatment') }:</b> {track.treatment_name}</p>
                        <p><b>{ t('info.dosage') }:</b> {track.dosage}</p>
                        <p><b>{ t('info.interval') }:</b> {track.interval_hours}</p>
                    </div>
                    <div className='list-row-options'>
                        <p><b>{ t('card.taked') }:</b> <br/>  {track?.taken_time ? dateTimeUser(track.taken_time) : t('card.not_taken')}</p>
                        
                        <Button
                            variant='contained'
                            color={taked ? 'success' : 'primary'}
                            size='small'
                            disabled={taked}
                            onClick={!taked ? () => onUpdate(track) : undefined}
                        >
                            {taked ? t('card.taken') : t('card.take')}
                        </Button>
                        
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}