import { getGenderChartData, getAgeChartData } from '../utils/getAssocChartData';
import dayjs from 'dayjs';

describe('getGenderChartData', () => {
    test('should count males and females correctly', () => {
        const assocList = [
            { gender: 'M' },
            { gender: 'F' },
            { gender: 'M' },
            { gender: 'F' },
            { gender: 'M' }
        ];

        const data = [
            { id: 0, value: 3, label: 'Male', color: '#1976d2' },
            { id: 1, value: 2, label: 'Female', color: '#ED8AAB' }
        ];

        const result = getGenderChartData(assocList);
        expect(result).toEqual(data);
    });

    test('should handle empty list', () => {
        const result = getGenderChartData([]);
        const data = [
            { id: 0, value: 0, label: 'Male', color: '#1976d2' },
            { id: 1, value: 0, label: 'Female', color: '#ED8AAB' }
        ];

        expect(result).toEqual(data);
    });
});

describe('getAgeChartData', () => {
    test('should categorize ages correctly', () => {
        const assocList = [
            { birth_date: dayjs().subtract(10, 'year').format('YYYY-MM-DD') },
            { birth_date: dayjs().subtract(25, 'year').format('YYYY-MM-DD') },
            { birth_date: dayjs().subtract(40, 'year').format('YYYY-MM-DD') },
            { birth_date: dayjs().subtract(65, 'year').format('YYYY-MM-DD') } 
        ];

        const data = [
            { id: 0, value: 1, label: '0-18', color: '#4caf50' },
            { id: 1, value: 1, label: '19-35', color: '#ff9800' },
            { id: 2, value: 1, label: '36-60', color: '#2196f3' },
            { id: 3, value: 1, label: '60+', color: '#9c27b0' }
        ];

        const result = getAgeChartData(assocList);
        expect(result).toEqual(data);
    });

    test('should return all zero values for empty list', () => {
        const result = getAgeChartData([]);
        const data = [
            { id: 0, value: 0, label: '0-18', color: '#4caf50' },
            { id: 1, value: 0, label: '19-35', color: '#ff9800' },
            { id: 2, value: 0, label: '36-60', color: '#2196f3' },
            { id: 3, value: 0, label: '60+', color: '#9c27b0' }
        ];

        expect(result).toEqual(data);
    });
});
