import { Toaster } from "@/components/ui/sonner";
import Navigation from "@/Navigation";
import { Outlet } from "react-router";

function RootLayout() {
    return ( 
        <>
        <Navigation/>
        <Outlet/> 
        <Toaster/>
        </>
     );
}

export default RootLayout;