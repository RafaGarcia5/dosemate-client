import { today } from './dateOperations';

export const getTreatmentChartData = (treatmentList = [], labels={}) => {
    const activeCount = treatmentList.filter(t => t.start_date <= today && t.end_date >= today).length;
    const inactiveCount = treatmentList.filter(t => t.end_date < today).length;
    const upcomingCount = treatmentList.filter(t => t.start_date > today).length;

    const totalTreatments = treatmentList.length;

    const chartDataTreatment = [
        { id: 0, value: activeCount, label: labels.activeLabel, color: '#2e7d32' },
        { id: 1, value: inactiveCount, label: labels.inactiveLabel, color: '#d32f2f' },
        { id: 2, value: upcomingCount, label: labels.upcomingLabel, color: '#1976d2' },
    ];

    return { chartDataTreatment, totalTreatments };
};
