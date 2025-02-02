'use client';
import { H2, H4 } from './typography';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Label } from '@radix-ui/react-label';
import { useQuery } from '@tanstack/react-query';
import { getMasters, getScheduleByMaster } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './button';
import SelectList from './select-list';
import BookingForm from './booking-form';

interface ISlot {
    start: string;
    duration: number;
}

export default function SlotsList() {
    const [selectedMaster, setSelectedMaster] = useState<number | null>(null); //Id of selected master
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null); //Id of selected slot

    const barbersQuery = useQuery({ queryKey: ['barbers'], queryFn: getMasters });
    const scheduleQuery = useQuery({
        queryKey: ['schedule', selectedMaster],
        queryFn: () => {
            if (!selectedMaster) return { schedules: [] };
            return getScheduleByMaster(selectedMaster);
        },
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

    console.log(scheduleQuery.data);

    return (
        <RadioGroup
            className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full"
            onValueChange={(value) => setSelectedSlot(parseInt(value, 10))}
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

                        <SelectList
                            masters={barbersQuery.data}
                            setMasterId={setSelectedMaster}
                            selectedMaster={selectedMaster}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {scheduleQuery.data?.schedules.length > 0 ? (
                <div className="flex flex-col gap-3">
                    <div>
                        <div className="flex flex-wrap gap-2 w-full">
                            <H4 className="mb-3">Утро</H4>
                            {scheduleQuery.data?.schedules?.map((slot) => {
                                return (
                                    slot.is_available &&
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
                            {scheduleQuery.data?.schedules?.map((slot) => {
                                return (
                                    slot.is_available &&
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
                            {scheduleQuery.data?.schedules?.map((slot) => {
                                return (
                                    slot.is_available &&
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
                                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white"
                                            >
                                                {slot.time}
                                            </Label>
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="default" disabled={!selectedSlot || !selectedMaster}>
                                Записаться
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Контактные данные</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>

                            {selectedMaster !== null && selectedSlot !== null && (
                                <BookingForm barber_id={selectedMaster} time_id={selectedSlot} />
                            )}
                        </DialogContent>
                    </Dialog>
                </div>
            ) : selectedMaster ? (
                <div>
                    <p>`Нет доступных записей у мастера выбранного мастера.`</p>
                </div>
            ) : (
                <div>
                    <p>Выберите мастера чтобы увидеть доступные расписания</p>
                </div>
            )}
        </RadioGroup>
    );
}
