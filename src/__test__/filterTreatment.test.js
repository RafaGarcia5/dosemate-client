import { filterTreatment } from './filterTreatment';
import { remainingDays } from './dateOperations';

jest.mock('./dateOperations', () => ({
    remainingDays: jest.fn()
}));

describe('filterTreatment', () => {
    const treatments = [
        {
            name: 'Flu',
            start_date: '2025-06-01',
            end_date: '2025-06-10',
            comment: 'Drink plenty of fluids'
        },
        {
            name: 'Stomachache',
            start_date: '2025-06-05',
            end_date: '2025-06-20',
            comment: 'Eat light'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('returns all treatments if there are no filters', () => {
        remainingDays.mockReturnValue({ status: 'success', message: '' });

        const result = filterTreatment(treatments);

        expect(result).toHaveLength(2);
    });

    it('filter by name', () => {
        remainingDays.mockReturnValue({ status: 'success', message: '' });

        const result = filterTreatment(treatments, 'Flu');

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Flu');
    });

    it('filter by comment', () => {
        remainingDays.mockReturnValue({ status: 'success', message: '' });

        const result = filterTreatment(treatments, 'Eat');

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Stomachache');
    });

    it('filter by upcomming treatment', () => {
        remainingDays
        .mockReturnValueOnce({ status: 'primary', message: '' }) // Flu
        .mockReturnValueOnce({ status: 'success', message: '' }); // Stomachache

        const result = filterTreatment(treatments, '', 'primary');

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Flu');
    });

    it('filter by ended treatment', () => {
        remainingDays
        .mockReturnValueOnce({ status: 'error', message: '' })
        .mockReturnValueOnce({ status: 'success', message: '' });

        const result = filterTreatment(treatments, '', 'error');

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Flu');
    });

    it('returns empty if there is no match', () => {
        remainingDays.mockReturnValue({ status: 'primary', message: '' });

        const result = filterTreatment(treatments, 'zzz', 'error');

        expect(result).toHaveLength(0);
    });
});
