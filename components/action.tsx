"use client";

import {DropdownMenuContentProps} from "@radix-ui/react-dropdown-menu";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import React from "react";
import {Link2, Trash2} from "lucide-react";
import {toast} from "sonner";
import {useApiMutation} from "@/hooks/use-api-mutation";
import {api} from "@/convex/_generated/api";

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
                    onClick={() => handleDelete()}
                >
                    <Trash2 className={'w-4 h-4 mr-2'}/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Actions;
