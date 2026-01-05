import { Card, CardContent, Skeleton } from '@mui/material';
import '../../styles/Card.css';
import '../../styles/Lists.css';

export default function CardSkeleton() {
  return (
    <Card className="card-container" variant="outlined">
      <CardContent>
        <div className="list-row">
          <div className="list-row-info">
            <Skeleton variant="text" width="50%" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="70%" height={20} />
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={20} />
          </div>
          <div className="list-row-options">
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="rectangular" width={80} height={20} />
            <Skeleton variant="rectangular" width={80} height={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
