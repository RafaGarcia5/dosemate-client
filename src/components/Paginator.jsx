import { Pagination } from '@mui/material';

export default function Paginator({ totalItems, itemsPerPage, currentPage, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            showFirstButton
            showLastButton
            color='primary'
            className='list-pagination'
        />
    );
}