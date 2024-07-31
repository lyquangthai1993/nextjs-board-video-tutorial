import Image from "next/image";

const EmptyFavorites = () => {
    return (
        <div className={'h-full flex flex-col items-center justify-center'}>
            <Image src={'/empty-favorites.svg'} alt={'Emtpy'}
                   height={140}
                   width={140}
            />
            <h2>
                No favorite boards!
            </h2>
            <p className={'text-muted-foreground text-sm mt-2'}>
                Try favoriting a board
            </p>
        </div>);
};

export default EmptyFavorites;
