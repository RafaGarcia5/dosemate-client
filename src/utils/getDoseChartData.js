export const getDoseChartData = (trackList = [], labels = {}) => {
    const totalDoses = trackList.length;
    const taken = trackList.filter(track => track.taken_dose === 1).length;
    const notTaken = totalDoses - taken;
    const chartDataDose = [
        { id: 0, value: taken, label: labels.takenLabel, color: '#59a14f' },
        { id: 1, value: notTaken, label: labels.notTakenLabel, color: '#e15759' },
    ];

    return { chartDataDose, totalDoses };
};
