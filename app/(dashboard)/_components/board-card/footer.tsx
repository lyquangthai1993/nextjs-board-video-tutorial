interface FooterProps {
    isFavorite: boolean;
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    onClick: () => void;
    disabled: boolean;
}

const Footer = ({
                    isFavorite,
                    title,
                    authorLabel,
                    createdAtLabel,
                    onClick,
                    disabled
                }: FooterProps) => {
    return (
        <div className={'relative bg-white p-3'}>
            <p className={'text-[13px] truncate max-w-[calc(100%-20px)]'}>
                {title}
            </p>
            <p className={'opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'}>
                <span className={'text-[13px] text-gray-500'}>
                    {authorLabel}, {createdAtLabel}
                </span>
            </p>
        </div>
    );
};

export default Footer;
