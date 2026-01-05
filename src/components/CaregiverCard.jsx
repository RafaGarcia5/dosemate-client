import '../styles/Card.css';
import { Card, CardContent, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CaregiverCard({ caregiver, onDelete }) {
    const { t } = useTranslation('associates');
    const { t: tCommon } = useTranslation('common');

    return (
        <Card className='card-container' variant='outlined'>
            <CardContent>
                <div className='list-row'>
                    <div>
                        <h2>{caregiver.name}</h2>
                        <p><b>{ t('card.email') }:</b> {caregiver.email}</p>
                    </div>
                    <div>
                        <Button
                            variant='contained'
                            color='error'
                            onClick={() => onDelete(caregiver)}
                        >
                            { tCommon('button.delete') }
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
