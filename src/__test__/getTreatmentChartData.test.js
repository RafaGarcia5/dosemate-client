import { getTreatmentChartData } from '../utils/getTreatmentChartData';
import dayjs from 'dayjs';

describe('getTreatmentChartData', () => {
    test('should categorize treatments correctly', () => {
        const treatmentList = [
            { start_date: dayjs().subtract(10, 'day').format('YYYY-MM-DD'), end_date: dayjs().add(10, 'day').format('YYYY-MM-DD') },
            { start_date: dayjs().subtract(30, 'day').format('YYYY-MM-DD'), end_date: dayjs().subtract(5, 'day').format('YYYY-MM-DD') },
            { start_date: dayjs().add(5, 'day').format('YYYY-MM-DD'), end_date: dayjs().add(20, 'day').format('YYYY-MM-DD') }
        ];

        const data = {
            chartDataTreatment: [
                { id: 0, value: 1, label: 'Active', color: '#2e7d32' },
                { id: 1, value: 1, label: 'Inactive', color: '#d32f2f' },
                { id: 2, value: 1, label: 'Upcoming', color: '#1976d2' }
            ],
            totalTreatments: 3
        };

        const result = getTreatmentChartData(treatmentList);
        expect(result).toEqual(data);
    });

    test('should return all zero values for empty list', () => {
        const result = getTreatmentChartData([]);
        const data = {
            chartDataTreatment: [
                { id: 0, value: 0, label: 'Active', color: '#2e7d32' },
                { id: 1, value: 0, label: 'Inactive', color: '#d32f2f' },
                { id: 2, value: 0, label: 'Upcoming', color: '#1976d2' }
            ],
            totalTreatments: 0
        };

        expect(result).toEqual(data);
    });

    test('should handle all treatments as inactive', () => {
        const treatmentList = [
            { start_date: dayjs().subtract(30, 'day').format('YYYY-MM-DD'), end_date: dayjs().subtract(10, 'day').format('YYYY-MM-DD') },
            { start_date: dayjs().subtract(40, 'day').format('YYYY-MM-DD'), end_date: dayjs().subtract(20, 'day').format('YYYY-MM-DD') }
        ];

        const data = {
            chartDataTreatment: [
                { id: 0, value: 0, label: 'Active', color: '#2e7d32' },
                { id: 1, value: 2, label: 'Inactive', color: '#d32f2f' },
                { id: 2, value: 0, label: 'Upcoming', color: '#1976d2' }
            ],
            totalTreatments: 2
        };

        const result = getTreatmentChartData(treatmentList);
        expect(result).toEqual(data);
    });

    test('should handle all treatments as upcoming', () => {
        const treatmentList = [
            { start_date: dayjs().add(5, 'day').format('YYYY-MM-DD'), end_date: dayjs().add(15, 'day').format('YYYY-MM-DD') },
            { start_date: dayjs().add(10, 'day').format('YYYY-MM-DD'), end_date: dayjs().add(20, 'day').format('YYYY-MM-DD') }
        ];

        const data = {
            chartDataTreatment: [
                { id: 0, value: 0, label: 'Active', color: '#2e7d32' },
                { id: 1, value: 0, label: 'Inactive', color: '#d32f2f' },
                { id: 2, value: 2, label: 'Upcoming', color: '#1976d2' }
            ],
            totalTreatments: 2
        };

        const result = getTreatmentChartData(treatmentList);
        expect(result).toEqual(data);
    });
});
