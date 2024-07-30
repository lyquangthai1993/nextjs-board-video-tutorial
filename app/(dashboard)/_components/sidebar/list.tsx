"use client";

import {useOrganization, useOrganizationList} from "@clerk/nextjs";
import Item from "@/app/(dashboard)/_components/sidebar/item";

const List = () => {
    const {userMemberships} = useOrganizationList({
        userMemberships: true,
    });
    const {organization} = useOrganization();

    if (!userMemberships.data?.length) {
        return null;
    }

    return (
        <ul className={'space-y-4'}>
            {userMemberships.data.map((membership) => (
                <Item key={membership.id}
                      id={membership.organization.id}
                      name={membership.organization.name}
                      imageUrl={membership.organization.imageUrl}
                      idActive={organization?.id}/>
            ))}
        </ul>
    );
};

export default List;
