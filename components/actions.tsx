"use client";

import {DropdownMenuContentProps} from "@radix-ui/react-dropdown-menu";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React from "react";
import {Link2, Pencil, Trash2} from "lucide-react";
import {toast} from "sonner";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";
import ConfirmModal from "@/components/ui/confirm-modal";
import {Button} from "@/components/ui/button";
import {useRenameModal} from "@/store/use-rename-modal";

interface ActionsProps {
    children?: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

// noinspection JSUnusedLocalSymbols
const Actions = ({
                     children,
                     side,
                     sideOffset,
                     id,
                     title
                 }: ActionsProps) => {
    const {onOpen} = useRenameModal();
    const {mutate} = useApiMutation(api.boards.remove);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success('Link copied to clipboard'))
            .catch(() => toast.error('Failed to copy link'));
    };
    const handleDelete = () => {
        mutate({
            id
        })
            .then(_id => {
                toast.success('Board deleted');
            })
            .catch((_error) => {
                toast.error('Failed to delete board');
            });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className={'w-60'}
            >
                <DropdownMenuItem
                    className={'px-3 cursor-pointer'}
                    onClick={handleCopyLink}
                >
                    <Link2 className={'w-4 h-4 mr-2'}/>
                    Copy board Link
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={'px-3 cursor-pointer'}
                    onClick={()=>onOpen(id, title)}
                >
                    <Pencil className={'w-4 h-4 mr-2'}/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header={'Delete Board?'}
                    description={'This will delete the board and all its contents.'}
                    onConfirm={handleDelete}>
                    <Button
                        variant={'ghost'}
                        className={'px-3 cursor-pointer text-sm w-full justify-start font-normal'}
                    >
                        <Trash2 className={'w-4 h-4 mr-2'}/>
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions;
