"use client";

import EmptySearch from "@/app/(dashboard)/_components/empty-search";
import EmptyFavorites from "@/app/(dashboard)/_components/empty-favorites";
import EmptyBoards from "@/app/(dashboard)/_components/empty-boards";

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

const BoardList = ({
                       orgId,
                       query
                   }: BoardListProps) => {
    const data = []; //TODO:

    if (!data?.length && query.search) {
        return (
            <EmptySearch/>
        );
    }

    if (!data?.length && query.favorites) {
        return (
           <EmptyFavorites/>
        );
    }

    if (!data?.length) {
        return (
            <EmptyBoards/>
        );
    }

    return (
        <>
            {JSON.stringify(query)}
        </>
    );
};

export default BoardList;
