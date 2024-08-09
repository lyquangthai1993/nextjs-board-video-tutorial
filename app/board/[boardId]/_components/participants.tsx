"use client";

import {Skeleton} from "@/components/ui/skeleton";
import {useOthers, useSelf} from "@liveblocks/react";
import UserAvatar from "@/app/board/[boardId]/_components/user-avatar";
import {connectionIdToColor} from "@/lib/utils";

interface ParticipantsProps {
}

const MAX_SHOWN_USERS = 2;
const Participants = ({}: ParticipantsProps) => {
    const users = useOthers();
    const currentUser = useSelf();
    const hasMoreUsers = users.length > MAX_SHOWN_USERS;

    return (
        <div className={'absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md'}>
            <div className={'flex gap-x-2'}>
                {currentUser && (
                    <UserAvatar
                        src={currentUser.info?.picture}
                        name={`${currentUser.info?.name} (You)`}
                        fallback={currentUser.info?.name?.[0] || 'T'}
                    />
                )}

                {users.slice(0, MAX_SHOWN_USERS)
                    .map(({connectionId, info}) => {
                        return (
                            <UserAvatar
                                borderColor={connectionIdToColor(connectionId)}
                                key={connectionId}
                                src={info?.picture}
                                name={info?.name}
                                fallback={info?.name?.[0] || 'T'}
                            />

                        );
                    })
                }

                {hasMoreUsers && (
                    <UserAvatar
                        name={`+${users.length - MAX_SHOWN_USERS} more`}
                        fallback={`+${users.length - MAX_SHOWN_USERS}`}
                    />
                )}
            </div>
        </div>
    );
};
export const ParticipantsSkeleton = function () {
    return (
        <div className={'absolute h-12 top-2 right-2 bg-white rounded-md px-3 flex items-center shadow-md w-[100px]'}>
            <Skeleton className={'h-full w-full bg-white'}/>
        </div>
    );
};

export default Participants;
