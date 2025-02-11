import { Input } from '@/components/ui/input';
import React from 'react';

interface IProps {
    icon: React.ReactNode;
}

export default function IconInput({ icon }: IProps) {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center ml-[9px] pointer-events-none w-4 h-4 text-zinc-500">
                {icon}
            </div>
            <Input type="search" id="search" placeholder="Поиск" className="pl-8 appearance-none" />
        </div>
    );
}
