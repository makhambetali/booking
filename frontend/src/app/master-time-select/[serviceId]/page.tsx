'use client';
import SlotsList from '@/components/ui/slots-list';
import { useParams } from 'next/navigation';

export default function MasterTimeSelectPage() {
    const params = useParams();
    console.log(params);

    return (
        <div className="w-full max-w-full bg-zinc-100 ">
            <SlotsList />
        </div>
    );
}
