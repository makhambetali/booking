import BookingForm from '@/components/ui/booking-form';
import ServiceSelectPage from '@/components/ui/service-select';
import SlotsList from '@/components/ui/slots-list';

export default function Home() {
    return (
        <div className="w-full max-w-full bg-zinc-100">
            <ServiceSelectPage />
            {/* <SlotsList /> */}
        </div>
    );
}
п