import { Skeleton } from '@mui/material';
import '../../styles/MainPage.css';

export default function ChartSkeleton() {
  return (
    <div className='chart-noData' style={{ flexDirection: 'column' }}>
      <Skeleton variant='text' width={180} height={30} sx={{ mb: 2 }} />
      <Skeleton variant='circular' width={200} height={200} />
    </div>
  );
}
