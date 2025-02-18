import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import SelectMasterList from '../ui/select-master-list';
import { IMaster, SetNumberStateType } from '@/lib/type/types';

interface IProps {
    barbers: IMaster[];
    selectedMaster: number | null;
    setSelectedMaster: SetNumberStateType;
}

//Responsible for rendering and selecting masters
export default function SelectMasterDialog({ barbers, selectedMaster, setSelectedMaster }: IProps) {
    return (
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

                    <SelectMasterList
                        masters={barbers}
                        setMasterId={setSelectedMaster}
                        selectedMaster={selectedMaster}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
