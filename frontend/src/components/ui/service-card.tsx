/* eslint-disable @next/next/no-img-element */
import { H5 } from './typography';

export default function ServiceCard() {
    return (
        <div className="flex flex-col gap-2 items-start justify-between rounded-lg bordersm:p-4 text-left text-sm transition-all hover:bg-gray-100 bg-muted outline-none outline-offset-0  hover:outline-gray-100 hover:outline-[6px] cursor-pointer  overflow-hidden">
            <div className="w-full">
                <img
                    src="https://media.istockphoto.com/id/506514230/photo/beard-grooming.jpg?s=612x612&w=0&k=20&c=QDwo1L8-f3gu7mcHf00Az84fVU8oNpQLgvUw6eGPEkc="
                    alt="REPLACE LATER"
                    className="rounded-lg w-full h-52 object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <H5>Стрижка головы: Высшая категория</H5>
                <p className="text-zinc-500">
                    1ч · Мужская стрижка выполняется машинкой и ножницами. В услугу входит: -подбор стрижки, -мытье
                    головы до и после стрижки, -стрижка, -укладка профессиональными средствами
                </p>
                <H5 className="font-normal">10 000 ₸</H5>
            </div>
        </div>
    );
}
