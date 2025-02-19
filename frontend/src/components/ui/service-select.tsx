'use client';
import { SearchIcon } from 'lucide-react';
import IconInput from './icon-input';
import { H2, H3 } from './typography';
import ServiceCard from './service-card';
import { useState } from 'react';

const mockServices = [
    {
        id: 1,
        name: 'Борода 1 головы первой категории',
        description:
            'Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами',
        duration: 1,
        price: 10000,
    },
    {
        id: 2,
        name: 'Стрижка головы первой категории',
        description:
            'Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами',
        duration: 1,
        price: 10000,
    },
    {
        id: 3,
        name: 'Стрижка головы первой категории',
        description:
            'Мужская стрижка выполняется  машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами',
        duration: 1,
        price: 10000,
    },
];

export default function ServiceSelectPage() {
    const [searchItem, setSearchItem] = useState('');
    const [filteredServices, setFilteredServices] = useState(mockServices);

    const handleInputChange = (e) => {
        console.log('input changed', e.target.value);
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = mockServices.filter((service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(filteredItems);
        if (filteredItems.length > 0) {
            setFilteredServices(filteredItems);
        } else {
            setFilteredServices(mockServices);
        }
    };

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Выбрать услгу</H2>

            <div className="flex flex-col gap-3">
                <IconInput icon={<SearchIcon strokeWidth={2} />} onChange={handleInputChange} />
            </div>

            <div className="flex flex-col gap-4">
                <H3>Стрижка головы</H3>
                {filteredServices.map((service, index) => (
                    <ServiceCard
                        serviceId={service.id}
                        name={service.name}
                        description={service.description}
                        price={service.price}
                        duration={service.duration}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
