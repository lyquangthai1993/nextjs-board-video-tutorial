import {Skeleton} from "@/components/ui/skeleton";

interface InfoProps {
}

const Info = ({}: InfoProps) => {
    return (
        <div className={'absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'}>
            Information of board
        </div>
    );
};

Info.Skeleton = function InfoSkeleton() {
    return (
        <div className={'absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'}>
            <Skeleton className={'h-full w-full bg-white'}/>
        </div>
    );
}

export default Info;
