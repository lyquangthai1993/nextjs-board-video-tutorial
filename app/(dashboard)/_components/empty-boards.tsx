import Image from "next/image";
import {Button} from "@/components/ui/button";

const EmptyBoards = () => {
    return (
        <div className={'h-full flex flex-col items-center justify-center'}>
            <Image src={'/empty-boards.svg'} alt={'Emtpy'}
                   height={110}
                   width={110}
            />
            <h2>
                Create your first board
            </h2>
            <p className={'text-muted-foreground text-sm mt-2'}>
                Start by creating a board
            </p>
            <div className={'mt-6'}>
                <Button size={'lg'}>
                    Create Board
                </Button>
            </div>
        </div>);
};

export default EmptyBoards;
