'use client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { H2, H4 } from './typography';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@radix-ui/react-label';
import { useQuery } from '@tanstack/react-query';
import { getMasters, getScheduleByMaster } from '@/lib/utils';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './button';
import SelectList from './select-list';

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

    const barbersQuery = useQuery({ queryKey: ['barbers'], queryFn: getMasters });
    const scheduleQuery = useQuery({
        queryKey: ['schedule', selectedMaster],
        queryFn: () => getScheduleByMaster(selectedMaster),
        enabled: !!selectedMaster,
    });

    const isLoading = barbersQuery.isLoading || scheduleQuery.isLoading;
    const isError = barbersQuery.isError || scheduleQuery.isError;

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    console.log(scheduleQuery.data?.schedules);

    const scheduleSlots = scheduleQuery.data?.schedules;

    return (
        <RadioGroup
            defaultValue={slots[0].start}
            className="space-y-6 mx-auto w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12"
        >
            <H2>Новая запись</H2>
            <div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Выберите мастера</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Выберите мастера</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>

                        <SelectList masters={barbersQuery.data} setMasterId={setSelectedMaster} />
                    </DialogContent>
                </Dialog>
            </div>

            {scheduleSlots ? (
                <div className="flex flex-col gap-3">
                    <div>
                        <H4 className="mb-3">Утро</H4>
                        <div className="flex flex-wrap gap-2 w-full">
                            {scheduleSlots?.map((slot) => {
                                return (
                                    slot.time < '1200' && (
                                        <div
                                            key={slot.id}
                                            className=" flex-grow-0 flex-shrink-0 w-[calc(25%_-_0.5rem)] 
                                 sm:w-[calc(20%_-_0.5rem)]
                                 md:w-[calc(12.5%_-_0.5rem)]"
                                        >
                                            <RadioGroupItem id={slot.id} value={slot.id} className="peer hidden" />
                                            <Label
                                                htmlFor={slot.id}
                                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white
                             "
                                            >
                                                {slot.time}
                                            </Label>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <H4 className="mb-3">День</H4>
                        <div className="flex flex-wrap gap-2 w-full">
                            {scheduleSlots?.map((slot) => {
                                return (
                                    slot.time > '1200' &&
                                    slot.time < '1800' && (
                                        <div
                                            key={slot.id}
                                            className=" flex-grow-0 flex-shrink-0 w-[calc(25%_-_0.5rem)] 
                                 sm:w-[calc(20%_-_0.5rem)]
                                 md:w-[calc(12.5%_-_0.5rem)]"
                                        >
                                            <RadioGroupItem id={slot.id} value={slot.id} className="peer hidden" />
                                            <Label
                                                htmlFor={slot.id}
                                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white
                             "
                                            >
                                                {slot.time}
                                            </Label>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <H4 className="mb-3">Вечер</H4>
                        <div className="flex flex-wrap gap-2 w-full">
                            {scheduleSlots?.map((slot) => {
                                return (
                                    slot.time > '1800' && (
                                        <div
                                            key={slot.id}
                                            className=" flex-grow-0 flex-shrink-0 w-[calc(25%_-_0.5rem)] 
                                 sm:w-[calc(20%_-_0.5rem)]
                                 md:w-[calc(12.5%_-_0.5rem)]"
                                        >
                                            <RadioGroupItem id={slot.id} value={slot.id} className="peer hidden" />
                                            <Label
                                                htmlFor={slot.id}
                                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white
                             "
                                            >
                                                {slot.time}
                                            </Label>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>Выберите мастера чтобы увидеть доступные расписания</p>
                </div>
            )}
        </RadioGroup>
    );
}
