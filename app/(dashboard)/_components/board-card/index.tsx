"use client";

import Link from "next/link";
import Image from "next/image";
import Overlay from "@/app/(dashboard)/_components/board-card/overlay";
import {useAuth} from "@clerk/nextjs";
import {formatDistanceToNow} from "date-fns";
import Footer from "@/app/(dashboard)/_components/board-card/footer";

import {Skeleton} from "@/components/ui/skeleton";

interface BoardCardProps {
    id: string;
    title: string;
    authorName: string;
    authorId: string;
    createdAt: number;
    imageUrl: string;
    orgId: string;
    isFavorite: boolean;
}

export default function BoardCard({
                                      id,
                                      title,
                                      authorName,
                                      authorId,
                                      createdAt,
                                      imageUrl,
                                      orgId,
                                      isFavorite
                                  }: BoardCardProps) {
    const {userId} = useAuth();
    const authorLabel = userId === authorId ? 'You' : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true
    });
    return (

        <Link href={`/board/${id}`}>
            <div
                className={'group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'}>
                <div className={'relative flex-1 bg-amber-50'}>
                    <Image src={imageUrl} alt={title} fill className={'object-fill'}/>
                    <Overlay/>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={() => console.log('clicked')}
                    disabled={false}
                />
            </div>
        </Link>

    );
}


BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div
            className={' aspect-[100/127] border rounded-lg overflow-hidden'}>
            <Skeleton className={'h-full w-full'}/>
        </div>
    );
};
