import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/Navigation";
import SideBar from "@/SideBar";
import { Outlet } from "react-router";

function AdminLayout() {
    return ( 
        <div className="flex flex-col h-screen">
            <Navigation className="fixed top-0 left-0 z-20 bg-white shadow-md" />

            <div className="flex flex-1 pt-6">
                <SideBar className="fixed left-0 top-10 bg-gray-800 text-white" />

                <div className="flex-1 h-screen overflow-y-scroll p-4 scrollbar-hide border-t-2 border-slate-100">
                    <Outlet />
                </div>
                <Toaster/>
            </div>
        </div>
    );
}

export default AdminLayout;
