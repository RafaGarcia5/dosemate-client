import '../styles/Lists.css';
import { useState, useEffect } from 'react';
import { useTrackList } from '../hooks/useTrackList';
import { TextField } from '@mui/material';
import { today, dateFormat } from '../utils/dateOperations';
import { useTranslation } from 'react-i18next';
import TrackCard from '../components/TrackCard';
import TrackCardSkeleton from '../components/skeletons/TrackCardSkeleton';
import ConfirmationDialog from '../components/ConfirmationDialog';
import SearchBar from '../components/SearchBar';
import Paginator from '../components/Paginator';

export default function Track(){
    const { t } = useTranslation('track');
    const {
        trackList,
        selectedTrack,
        setSelectedTrack,
        dialogType,
        setDialogType,
        handleConfirm, 
        setDate,
        trackLoading
    } = useTrackList();

    const [selectedDate, setSelectedDate] = useState(today);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    
    const filteredTracks = trackList.filter(track => {
        const searchText = search.toLowerCase();
        return (
            track.medicament_name.toLowerCase().includes(searchText) ||
            track.treatment_name.toLowerCase().includes(searchText) ||
            track.schedule.toLowerCase().includes(searchText) ||
            track.dosage.toLowerCase().includes(searchText)
        );
    });
    
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    
    const handleUpdateClick = (track) => {
        setDialogType('confirm');
        setSelectedTrack(track);
    }
    
    const handleCancelClick = () => {
        setDialogType(null);
        setSelectedTrack(null);
    }
     
    useEffect(() => {
        setPage(1);
    }, [search]);

    useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);
 
    const paginatedTracks = filteredTracks.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );
    
    return(
        <div className='list-container'>
            <div className='list-options'>
                <SearchBar
                    value={search}
                    onChange={(val) => {
                        setSearch(val);
                        setPage(1);
                    }}
                    placeholder={ t('search') }
                />
                <div className='filter-actions'>
                    <TextField
                        fullWidth
                        id='selectedDate'
                        type='date'
                        name='selectedDate'
                        value={dateFormat(selectedDate)}
                        onChange={e => setSelectedDate(e.target.value)}
                        size='small'
                    />
                </div>
            </div>
            <div className='list-item-container'>
                { trackLoading
                    ? (
                        <>
                            {[...Array(3)].map((_, idx) => (
                            <TrackCardSkeleton key={idx} />
                            ))}
                        </>
                    )
                    : (trackList.length === 0 
                        ? (<h1>{ t('withoutInfo') }</h1>) 
                        : (paginatedTracks.map((track) => (
                            <TrackCard 
                                key={track.id}
                                track={track}
                                onUpdate={handleUpdateClick}
                            />
                        ))
                    ))
                }
            </div>

            {filteredTracks.length > itemsPerPage && (
                <Paginator
                    totalItems={filteredTracks.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                    onPageChange={handlePageChange}
                />
            )}

            <ConfirmationDialog
                open={dialogType === 'confirm'}
                onClose={handleCancelClick}
                onConfirm={handleConfirm}
                title={ t('update.title') }
                message={`${t('update.message1')} ${selectedTrack?.dosage || ''} ${ t('update.message2') } ${selectedTrack?.medicament_name || ''}?`}
                confirmText={ t('update.button') }
            />
        </div>
    );
}