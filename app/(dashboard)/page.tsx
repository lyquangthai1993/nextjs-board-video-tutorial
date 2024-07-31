"use client";

import EmptyOrg from "@/app/(dashboard)/_components/empty-org";
import {useOrganization} from "@clerk/nextjs";
import BoardList from "@/app/(dashboard)/_components/board-list";

interface DashboardPageProps {
    searchParams: {
        search?: string;
        favorite?: string;
    };
}

const DashboardPage = ({
                           searchParams
                       }: DashboardPageProps) => {
    const {organization} = useOrganization();
    return (
        <div className={'flex-1 h-[calc(100%-80px)] p-6'}>
            {!organization ?
                <EmptyOrg/> :
                <BoardList orgId={organization.id} query={searchParams}/>
            }
        </div>
    );
};

export default DashboardPage;
