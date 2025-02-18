import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMasters, getScheduleByMaster } from '@/lib/utils';

export function useBooking() {
    const [selectedMasterId, setSelectedMasterId] = useState<number | null>(null);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

    const barbersQuery = useQuery({ queryKey: ['barbers'], queryFn: getMasters });
    const scheduleQuery = useQuery({
        queryKey: ['schedule', selectedMasterId],
        queryFn: () => (selectedMasterId ? getScheduleByMaster(selectedMasterId) : { schedules: [] }),
        enabled: !!selectedMasterId,
    });

    return {
        selectedMaster: selectedMasterId,
        setSelectedMaster: setSelectedMasterId,
        selectedSlot: selectedSlotId,
        setSelectedSlot: setSelectedSlotId,
        barbersQuery,
        scheduleQuery,
    };
}

export function useSelectMaster() {
    
}