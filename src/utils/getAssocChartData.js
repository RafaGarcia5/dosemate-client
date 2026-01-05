import { age } from "./dateOperations";
export const getGenderChartData = (assocList, labels) => {
    const maleCount = assocList.filter(a => a.gender === 'M').length;
    const femaleCount = assocList.filter(a => a.gender === 'F').length;

    return [
        { id: 0, value: maleCount, label: labels.maleLabel, color: '#1976d2' },
        { id: 1, value: femaleCount, label: labels.femaleLabel, color: '#ED8AAB' },
    ];
};

export const getAgeChartData = (assocList) => {
    const ageRanges = {
        '0-18': 0,
        '19-35': 0,
        '36-60': 0,
        '60+': 0,
    };

    assocList.forEach(({ birth_date }) => {
        if (age(birth_date) <= 18) ageRanges['0-18']++;
        else if (age(birth_date) <= 35) ageRanges['19-35']++;
        else if (age(birth_date) <= 60) ageRanges['36-60']++;
        else ageRanges['60+']++;
    });

    return Object.entries(ageRanges).map(([label, value], idx) => ({
        id: idx,
        value,
        label,
        color: ['#4caf50', '#ff9800', '#2196f3', '#9c27b0'][idx],
    }));
};
