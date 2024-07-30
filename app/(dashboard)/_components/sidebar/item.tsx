"use client";

import Image from "next/image";
import {cn} from "@/lib/utils";
import {useOrganizationList} from "@clerk/nextjs";
import Hint from "@/components/hint";

interface ItemProps {
    id: string;
    name: string;
    imageUrl: string;
    idActive?: string;
}

const Item = ({
                  id,
                  name,
                  imageUrl,
                  idActive
              }: ItemProps) => {

    const {setActive} = useOrganizationList({
        userMemberships:true,
    });

    const isActive = idActive === id;
    // console.log("id = ", id);
    const onClick = (_id) => {

        if (isActive) return;

        if (setActive) {
            setActive({
                organization: _id
            }).then(r => {
                console.log('r-----------', r);
            });
        }
    };

    return (
        <div className={'aspect-square relative'}>
            <Hint label={name} side={'right'} align={'start'} sideOffset={18}>
                <Image src={imageUrl} alt={name} fill
                       onClick={() => onClick(id)}
                       className={cn(
                           'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
                           isActive && 'opacity-100'
                       )}
                />
            </Hint>
        </div>
    );
};

export default Item;
