import '../styles/MainPage.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { useTrackList } from '../hooks/useTrackList';
import { useTreatmentList } from '../hooks/useTreatmentList';
import { getDoseChartData } from '../utils/getDoseChartData';
import { getTreatmentChartData } from '../utils/getTreatmentChartData';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TextField } from '@mui/material';
import { formatMonth, formatYear, currentMonthYear } from '../utils/dateOperations';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import ChartSkeleton from '../components/skeletons/ChartSkeleton';

export default function PatientMainPage () {
    const { t } = useTranslation('mainPage');
    const { t: tCommon } = useTranslation('common');

    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [selectedMonth, setSelectedMonth] = useState( currentMonthYear() );
    const { trackList, setDate, trackLoading } = useTrackList();
    const { chartDataDose, totalDoses } = getDoseChartData(
        trackList, 
        { 
            takenLabel: t('patient.doseChart.taken'), 
            notTakenLabel: t('patient.doseChart.notTaken')
        });
    const { treatmentList, setMonth, setYear, loading } = useTreatmentList();
    const { chartDataTreatment, totalTreatments } = getTreatmentChartData(
        treatmentList, 
        {
            activeLabel: tCommon('status.active'), 
            inactiveLabel: tCommon('status.inactive'), 
            upcomingLabel: tCommon('status.upcoming')
        });
    const navigate = useNavigate();

    const handleItemClick = (event, item) => {
        const selectedItem = chartDataTreatment[item.dataIndex];
        navigate('/dashboard/treatment', {
            state: {
                date: selectedMonth,
                status: selectedItem.label
            }
        });
    }

    useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate, trackList]);

    useEffect(() => {
        setMonth(formatMonth(selectedMonth));
        setYear(formatYear(selectedMonth));
    }, [selectedMonth]);
 
    return (
        <div className='patient-mainPage-container'>
            <h1>{ t('patient.title') }</h1>
            <div className='patient-mainPage-container patient-mainPage-row'>
                <div className='patient-mainPage-trackChart'>
                    <TextField
                        fullWidth
                        id='selectedDate'
                        type='date'
                        name='selectedDate'
                        value={dayjs(selectedDate).format('YYYY-MM-DD')}
                        onChange={e => setSelectedDate(e.target.value)}
                        size='small'
                    />
                    { trackLoading 
                        ? 
                            <ChartSkeleton/>
                        : (totalDoses !== 0 
                            ? (<>
                                    <h2 className='chart-title'>{ t('patient.dosesChartTitle') }</h2>
                                    <PieChart
                                        series={[{
                                            data: chartDataDose,
                                            highlightScope: { fade: 'global', highlight: 'item' },
                                            innerRadius: 60,
                                            outerRadius: 100,
                                        }]}
                                        width={300}
                                        height={300}
                                    />
                                </>) 
                            : ( 
                                <div className='chart-noData'>
                                    <h2 className='chart-title'>{t('patient.noDosesInfo')}</h2>
                                </div>
                        ))
                    }    
                </div>
                <div className='patient-mainPage-trackChart'>
                    <TextField
                        fullWidth
                        id='selectedMonth'
                        type='month'
                        name='selectedMonth'
                        value={selectedMonth}
                        onChange={e => {
                            setSelectedMonth(e.target.value);
                        }}
                        size='small'
                    />
                    { loading 
                        ? 
                            <ChartSkeleton />
                        : (totalTreatments !== 0 
                            ? (<>
                                    <h2 className='chart-title'>{ t('patient.treatmentChartTitle') }</h2>
                                    <PieChart
                                        series={[{
                                            data: chartDataTreatment,
                                            highlightScope: { fade: 'global', highlight: 'item' },
                                            innerRadius: 60,
                                            outerRadius: 100,
                                        }]}
                                        width={300}
                                        height={300}
                                        onItemClick={handleItemClick}
                                    />
                                </>) 
                            : (
                                <div className='chart-noData'>
                                    <h2 className='chart-title'>{ t('patient.noTreatmentsInfo') }</h2>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    );
};