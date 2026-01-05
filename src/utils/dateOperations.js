import dayjs from 'dayjs';
import i18n from '../config/i18n';

export const remainingDays = (start_date, end_date) => {
    const today = dayjs().startOf('day');
    const start = dayjs(start_date).startOf('day');
    const end = dayjs(end_date).startOf('day');
    
    if (today.isBefore(start)) {
        const daysUntilStart = start.diff(today, 'day');
        return {status: 'primary', message: i18n.t('date.starts_in', { count: daysUntilStart })};
    }

    if (today.isAfter(end)) {
        const daysSinceEnd = today.diff(end, 'day');
        return {status: 'error', message: i18n.t('date.ended_in', { count: daysSinceEnd})};
    }

    const daysRemaining = end.diff(today, 'day');
    if (daysRemaining === 0) {
        return {status:'success', message: i18n.t('date.ends_today')};
    }
    
    return {status: 'success', message: i18n.t('date.remaining_days', { count: daysRemaining })};
};

export const dateRange = (start_date, end_date) => {
    const start = dayjs(start_date);
    const end = dayjs(end_date);
    const isError = start.isAfter(end);
    return isError;
}

export const today = dayjs().format('YYYY-MM-DD');

export const dateFormat = (date) => dayjs(date).format('YYYY-MM-DD');

export const timestamp = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

export const dateUser = (date) => {
    return dayjs(date).format('MM/DD/YYYY');
}

export const dateTimeUser = (datetime) => {
    const formattedDate = dayjs(datetime).format('MM/DD/YYYY');
    const formattedTime = dayjs(datetime).format('hh:mm A');
    return `${formattedDate} ${i18n.t('date.datetime_user', { time: formattedTime })}`;
}

export const timeUser = (schedule) => {
    return dayjs(schedule).format('hh:mm A');
}

export const age = (birth_date) => {
    const today = dayjs().startOf('day');
    return today.diff(dayjs(birth_date), 'year');
}

export const currentYear = () => dayjs().year();

export const currentMonth = () => dayjs().month() + 1;

export const currentMonthYear = () => dayjs().format('YYYY-MM');

export const formatMonth = (dateStr) => {
    const date = dayjs(dateStr, 'YYYY-MM');
    return date.month() + 1;
}

export const formatYear = (dateStr) => {
    const date = dayjs(dateStr, 'YYYY-MM');
    return date.year();
}