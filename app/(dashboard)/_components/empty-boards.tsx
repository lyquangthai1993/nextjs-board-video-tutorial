"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useOrganization} from "@clerk/nextjs";

const EmptyBoards = () => {
    const createBoard = useMutation(api.board.create);
    const {organization} = useOrganization();

    const onClick = () => {
        console.log('onclick');
        if (!organization) return;

        createBoard({
            orgId: organization.id!,
            title: 'Untitled Board'
        })
            .then(r => {
                console.log('board created', r);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
                <Button size={'lg'} onClick={onClick}>
                    Create Board
                </Button>
            </div>
        </div>);
};

export default EmptyBoards;
