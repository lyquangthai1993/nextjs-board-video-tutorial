import {Skeleton} from "@/components/ui/skeleton";

interface ParticipantsProps {
}

const Participants = ({}: ParticipantsProps) => {
    return (
        <div className={'absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md'}>
            List users
        </div>
    );
};
Participants.Skeleton = function InfoSkeleton() {
    return (
        <div className={'absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md w-[100px]'}>
            <Skeleton className={'h-full w-full bg-white'}/>
        </div>
    );
}

export default Participants;
