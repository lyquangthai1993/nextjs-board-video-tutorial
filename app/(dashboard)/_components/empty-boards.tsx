"use client";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useOrganization} from "@clerk/nextjs";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {toast} from "sonner";

const EmptyBoards = () => {
    const {organization} = useOrganization();
    const {mutate, pending} = useApiMutation(api.board.create);

    const onClick = () => {
        console.log('onclick');
        if (!organization) return;

        mutate({
            orgId: organization.id!,
            title: 'Untitled Board'
        })
            .then(id => {
                console.log('board created', id);
                toast.success('Board created');
                //TODO: redirect to the board/{id}
            })
            .catch((error) => {
                console.error(error);
                toast.error('Failed to create board');
            });
    };

    return (
        <div className={'h-full flex flex-col items-center justify-center'}>
            <Image src={'/empty-boards.svg'}
                   alt={'Emtpy'}
                   height="110"
                   width="110"
            />
            <h2>
                Create your first board
            </h2>
            <p className={'text-muted-foreground text-sm mt-2'}>
                Start by creating a board
            </p>
            <div className={'mt-6'}>
                <Button disabled={pending} size={'lg'} onClick={onClick}>
                    Create Board
                </Button>
            </div>
        </div>
    );
};

export default EmptyBoards;
