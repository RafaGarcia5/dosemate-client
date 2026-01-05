import { createContext, useContext, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { getTrackBySchedule } from '../services/trackService';
import { timeUser, today } from '../utils/dateOperations';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [trackList, setTrackList] = useState([]);
    const [date, setDate] = useState(today);
    const [trackLoading, setTrackLoading] = useState(false);

    const remindedTrackIds = useRef(new Set());
    const activeToasts = useRef(new Map());

    const getTrackList = async () => {
        setTrackLoading(true);
        try {
            const data = await getTrackBySchedule(date);
            setTrackList(data);
        } catch {
            setTrackList([]);
        }finally{
            setTrackLoading(false);
        }
    };

    useEffect(() => {
        remindedTrackIds.current.clear();
        activeToasts.current.forEach((id) => toast.dismiss(id));
        activeToasts.current.clear();
        getTrackList();
    }, [date]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();

            trackList.forEach((track) => {
                if (track.taken_dose === 0 && track.schedule) {
                    const trackTime = dayjs(track.schedule);
                    const diff = now.diff(trackTime);
                    if (
                        diff > 0 && diff < 10 * 60 * 1000 && !remindedTrackIds.current.has(track.id)) {
                        const toastId = toast.info(`Time to take ${track.medicament_name} at ${timeUser(track.schedule)}`,{
                                autoClose: false,
                                closeOnClick: false,
                                draggable: false,
                                pauseOnHover: true,
                                onClose: () => {
                                    const stillExists = trackList.find(t => t.id === track.id && t.taken_dose === 0);
                                    if (stillExists) {
                                        remindedTrackIds.current.delete(track.id);
                                        activeToasts.current.delete(track.id);
                                    }
                                }
                            }
                        );
                        remindedTrackIds.current.add(track.id);
                        activeToasts.current.set(track.id, toastId);
                    }
                }
            });
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [trackList]);

    return (
        <NotificationContext.Provider value={{trackList, getTrackList, setDate, date, trackLoading}}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationScheduler = () => useContext(NotificationContext);
