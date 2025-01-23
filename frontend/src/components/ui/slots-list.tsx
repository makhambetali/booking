    'use client';
    import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { H2, H4 } from './typography';
    import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
    import { Label } from '@radix-ui/react-label';
    import { useQuery, useQueryClient } from '@tanstack/react-query';
    import { getMasters } from '@/lib/utils';
    import { useState } from 'react';

    interface ISlot {
        start: string;
        duration: number;
    }

    export default function SlotsList() {
        const slots: ISlot[] = [
            { start: '0700', duration: 30 },
            { start: '0730', duration: 30 },
            { start: '0800', duration: 30 },
            { start: '0830', duration: 30 },
            { start: '0900', duration: 30 },
            { start: '0930', duration: 30 },
            { start: '1000', duration: 30 },
            { start: '1030', duration: 30 },
            { start: '1100', duration: 30 },
            { start: '1130', duration: 30 },
            { start: '1200', duration: 30 },
            { start: '1230', duration: 30 },
            { start: '1300', duration: 30 },
            { start: '1330', duration: 30 },
            { start: '1400', duration: 30 },
            { start: '1430', duration: 30 },
            { start: '1800', duration: 30 },
            { start: '1830', duration: 30 },
            { start: '1900', duration: 30 },
            { start: '1930', duration: 30 },
            { start: '2000', duration: 30 },
        ];

        // const queryClient = useQueryClient();

        const [selectedMaster, setSelectedMaster] = useState<string>(''); //Id of selected master
        const { data, isLoading, isError } = useQuery({ queryKey: ['barbers'], queryFn: getMasters });

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (isError) {
            return <div>Error</div>;
        }

        console.log(data);
        return (
            <RadioGroup
                defaultValue={slots[0].start}
                className="space-y-6 mx-auto w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12"
            >
                <H2>Новая запись</H2>

                <div>
                    <Select value={selectedMaster} onValueChange={(value) => setSelectedMaster(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Выберите мастера" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={data[0].id}>{data[0].name}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <H4 className="mb-3">Утро</H4>
                    <div className="flex flex-wrap gap-2 w-full">
                        {slots.map(
                            (slot: ISlot) =>
                                slot.start < '1200' && (
                                    <div
                                        key={slot.start}
                                        className=" flex-grow-0 flex-shrink-0 w-[calc(25%_-_0.5rem)] 
                                    sm:w-[calc(20%_-_0.5rem)]
                                    md:w-[calc(12.5%_-_0.5rem)]"
                                    >
                                        <RadioGroupItem id={slot.start} value={slot.start} className="peer hidden" />
                                        <Label
                                            htmlFor={slot.start}
                                            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white
                                "
                                        >
                                            {slot.start}
                                        </Label>
                                    </div>
                                )
                        )}
                    </div>
                </div>

                <div>
                    <H4 className="mb-3">День</H4>
                    <div className="flex flex-wrap gap-2 w-full">
                        {slots.map(
                            (slot: ISlot) =>
                                slot.start > '1200' &&
                                slot.start < '1800' && (
                                    <div
                                        key={slot.start}
                                        className=" flex-grow-0 flex-shrink-0 w-[calc(25%_-_0.5rem)] 
                                    sm:w-[calc(20%_-_0.5rem)]
                                    md:w-[calc(12.5%_-_0.5rem)]"
                                    >
                                        <RadioGroupItem id={slot.start} value={slot.start} className="peer hidden" />
                                        <Label
                                            htmlFor={slot.start}
                                            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white
                                "
                                        >
                                            {slot.start}
                                        </Label>
                                    </div>
                                )
                        )}
                    </div>
                </div>

                <div>
                    <H4 className="mb-3">Вечер</H4>
                    <div className="flex flex-wrap gap-2 w-full">
                        {slots.map(
                            (slot: ISlot) =>
                                slot.start > '1800' && (
                                    <div
                                        key={slot.start}
                                        className=" flex-grow-0 flex-shrink-0 w-[calc(25%_-_0.5rem)] 
                                    sm:w-[calc(20%_-_0.5rem)]
                                    md:w-[calc(12.5%_-_0.5rem)]"
                                    >
                                        <RadioGroupItem id={slot.start} value={slot.start} className="peer hidden" />
                                        <Label
                                            htmlFor={slot.start}
                                            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white
                                "
                                        >
                                            {slot.start}
                                        </Label>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </RadioGroup>
        );
    }
