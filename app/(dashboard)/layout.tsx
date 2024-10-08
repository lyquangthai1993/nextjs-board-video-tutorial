import React from "react";
import Sidebar from "@/app/(dashboard)/_components/sidebar";
import OrgSidebar from "@/app/(dashboard)/_components/sidebar/org-sidebar";
import Navbar from "@/app/(dashboard)/_components/sidebar/navbar";


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = (
    {
        children
    }: DashboardLayoutProps) => {
    return (
        <main className={'h-full'}>
            <Sidebar/>
            <div className="pl-[60px] h-full">
                <div className={'flex gap-x-3 h-full'}>
                    <OrgSidebar/>

                    <div className={'h-full flex-1'}>
                        <Navbar/>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;
