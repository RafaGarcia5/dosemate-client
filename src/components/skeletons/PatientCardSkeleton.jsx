import { Card, CardContent, Skeleton } from '@mui/material';
import '../../styles/Card.css';
import '../../styles/Lists.css';

export default function PatientCardSkeleton() {
  return (
    <Card className="card-container" variant="outlined">
      <CardContent>
        <div className="list-row">
          <div className="list-row-info">
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="text" width="30%" height={20} />
          </div>
          <div className="list-row-options">
            <Skeleton variant="rectangular" width={80} height={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
