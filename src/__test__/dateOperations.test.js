import dayjs from 'dayjs';
import {
    remainingDays,
    dateRange,
    today,
    timestamp,
    dateUser,
    dateTimeUser,
    timeUser,
    age,
} from '../utils/dateOperations';

describe('dateOperations', () => {
    test('should return correct remaining days message for future date', () => {
        const start = dayjs().format('YYYY-MM-DD');
        const end = dayjs().add(3, 'day').format('YYYY-MM-DD');
        expect(remainingDays(start, end)).toEqual({status:'success', message: 'Remaining 3 days'});
    });

    test('should return "Ends today" for same day', () => {
        const todayDate = dayjs().format('YYYY-MM-DD');
        expect(remainingDays(todayDate, todayDate)).toEqual({status:'success', message: 'Ends today'});
    });

    test('should return correct message for past date', () => {
        const start = dayjs().format('YYYY-MM-DD');
        const end = dayjs().subtract(2, 'day').format('YYYY-MM-DD');
        expect(remainingDays(start, end)).toEqual({status:'error', message:'Ended 2 days ago'});
    });


    test('should return false if start date is before end date', () => {
        const start = dayjs().format('YYYY-MM-DD');
        const end = dayjs().add(1, 'day').format('YYYY-MM-DD');
        expect(dateRange(start, end)).toBe(false);
    });

    test('should return true if start date is after end date', () => {
        const start = dayjs().add(1, 'day').format('YYYY-MM-DD');
        const end = dayjs().format('YYYY-MM-DD');
        expect(dateRange(start, end)).toBe(true);
    });

    test('should return today\'s date in YYYY-MM-DD format', () => {
        expect(today).toBe(dayjs().format('YYYY-MM-DD'));
    });

    test('should return a timestamp in YYYY-MM-DD HH:mm:ss format', () => {
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        expect(timestamp).toMatch(regex);
    });

    test('should format date to MM/DD/YYYY', () => {
        const input = '2025-06-01';
        expect(dateUser(input)).toBe('06/01/2025');
    });

    test('should format datetime to MM/DD/YYYY at HH:mm', () => {
        const input = '2025-06-01 14:30:00';
        expect(dateTimeUser(input)).toBe('06/01/2025 at 14:30');
    });

    test('should format datetime to HH:mm', () => {
        const input = '2025-06-01 14:30:00';
        expect(timeUser(input)).toBe('14:30');
    });

    test('should return age according to a birth date', () => {
        const input = dayjs().subtract(25, 'year').format('YYYY-MM-DD');
        expect(age(input)).toBe(25)
    });
});
