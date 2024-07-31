"use client";

import {OrganizationSwitcher, useOrganization, useOrganizationList, UserButton} from "@clerk/nextjs";
import SearchInput from "@/app/(dashboard)/_components/search-input";
import InviteButton from "@/app/(dashboard)/_components/invite-button";

const Navbar = () => {
    const {organization} = useOrganization();

    return (
        <div className={'flex items-center gap-x-4 p-5'}>
            <div className={'hidden lg:flex lg:flex-1'}>
                <SearchInput/>
            </div>

            <div className={'block lg:hidden flex-1'}>
                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                fontSize: '22px',
                                maxWidth: '376px'
                            },
                            organizationSwitcherTrigger: {
                                padding: '6px',
                                width: '100%',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                                fontSize: '22px',
                                justifyContent: 'space-between',
                                backgroundColor: 'white'
                            },
                            organizationPreviewMainIdentifier: {
                                fontSize: '18px',
                            },
                        }
                    }}
                />
            </div>
            {organization && (
                <InviteButton/>
            )}

            <UserButton/>
        </div>
    );
};

export default Navbar;
