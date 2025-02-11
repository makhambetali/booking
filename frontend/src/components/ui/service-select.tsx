import { SearchIcon } from 'lucide-react';
import IconInput from './icon-input';
import { H2, H3 } from './typography';
import ServiceCard from './service-card';

export default function ServiceSelectPage() {
    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full">
            <H2>Выбрать услгу</H2>

            <div className="flex flex-col gap-3">
                <IconInput icon={<SearchIcon strokeWidth={2} />} />
            </div>

            <div className="flex flex-col gap-4">
                <H3>Стрижка головы</H3>
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
            </div>
        </div>
    );
}
