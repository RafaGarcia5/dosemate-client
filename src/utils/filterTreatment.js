import { remainingDays } from './dateOperations';

export const filterTreatment = (treatmentList, searchText = '', statusFilter = 'all') => {
  return treatmentList.filter((treatment) => {
    const { status } = remainingDays(treatment.start_date, treatment.end_date);
    const lowerSearch = searchText.toLowerCase();

    const matchesSearch =
      treatment.name.toLowerCase().includes(lowerSearch) ||
      treatment.start_date.toLowerCase().includes(lowerSearch) ||
      treatment.end_date.toLowerCase().includes(lowerSearch) ||
      treatment.comment?.toLowerCase().includes(lowerSearch);

    const matchesStatus = statusFilter === 'all' || status === statusFilter;

    return matchesSearch && matchesStatus;
  });
};
