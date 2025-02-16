'use client';
import SlotsList from '@/components/ui/slots-list';
import { useBooking } from '@/hooks/use-booking';
import { useParams } from 'next/navigation';

export default function MasterTimeSelectPage() {
    const params = useParams();
    const { selectedMaster, selectedSlot, barbersQuery, scheduleQuery, setSelectedMaster, setSelectedSlot } =
        useBooking();
    console.log(params);

    return (
        <div className="w-full max-w-full bg-zinc-100 ">
            <SlotsList
                barbers={barbersQuery.data}
                schedules={scheduleQuery.data?.schedules}
                selectedMaster={selectedMaster}
                setSelectedMaster={setSelectedMaster}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot}
                isLoading={barbersQuery.isLoading || scheduleQuery.isLoading}
                isError={barbersQuery.isError || scheduleQuery.isError}
            />
        </div>
    );
}
