import { getDoseChartData } from '../utils/getDoseChartData';

describe('getDoseChartData', () => {
    test('should count taken and not taken doses correctly', () => {
        const trackList = [
            { taken_dose: 1 },
            { taken_dose: 0 },
            { taken_dose: 1 },
            { taken_dose: 1 },
            { taken_dose: 0 }
        ];

        const data = {
            chartDataDose: [
                { id: 0, value: 3, label: 'Taken', color: '#59a14f' },
                { id: 1, value: 2, label: 'Not taken', color: '#e15759' }
            ],
            totalDoses: 5
        };

        const result = getDoseChartData(trackList);
        expect(result).toEqual(data);
    });

    test('should handle empty list', () => {
        const result = getDoseChartData([]);
        const data = {
            chartDataDose: [
                { id: 0, value: 0, label: 'Taken', color: '#59a14f' },
                { id: 1, value: 0, label: 'Not taken', color: '#e15759' }
            ],
            totalDoses: 0
        };

        expect(result).toEqual(data);
    });

    test('should handle all doses taken', () => {
        const trackList = [
            { taken_dose: 1 },
            { taken_dose: 1 },
            { taken_dose: 1 },
            { taken_dose: 1 },
            { taken_dose: 1 }
        ];

        const data = {
            chartDataDose: [
                { id: 0, value: 5, label: 'Taken', color: '#59a14f' },
                { id: 1, value: 0, label: 'Not taken', color: '#e15759' }
            ],
            totalDoses: 5
        };

        const result = getDoseChartData(trackList);
        expect(result).toEqual(data);
    });

    test('should handle all doses not taken', () => {
        const trackList = [
            { taken_dose: 0 },
            { taken_dose: 0 },
            { taken_dose: 0 }
        ];

        const data = {
            chartDataDose: [
                { id: 0, value: 0, label: 'Taken', color: '#59a14f' },
                { id: 1, value: 3, label: 'Not taken', color: '#e15759' }
            ],
            totalDoses: 3
        };

        const result = getDoseChartData(trackList);
        expect(result).toEqual(data);
    });
});
