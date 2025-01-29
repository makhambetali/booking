import { IMaster, SetNumberStateType } from '@/lib/type/types';
import MasterCard from './master-card';

interface IProps {
    masters: IMaster[];
    setMasterId: SetNumberStateType;
}

export default function SelectList({ masters, setMasterId }: IProps) {
    return (
        <div className="flex flex-col gap-3 sm:gap-3">
            {masters.map((master: IMaster) => (
                //close on select
                <MasterCard name={master.name} key={master.id} id={master.id} setMasterId={setMasterId} />
            ))}
        </div>
    );
}
