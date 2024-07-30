"use client";

import {Poppins} from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {OrganizationSwitcher} from "@clerk/nextjs";

const font = Poppins({
    subsets: ['latin'],
    weight: ['600'],
});


const OrgSidebar = (props) => {
    return (
        <div className={'hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'}>

            <Link href={'/'}>
                <div className={'flex items-center gap-x-2'}>
                    <Image src={'/vercel.svg'} alt={'logo'} width={60} height={60}/>
                    <span className={
                        cn(
                            'font-semibold text-2xl',
                            font.className
                        )
                    }>Board</span>
                </div>
            </Link>

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
    );
};

export default OrgSidebar;
