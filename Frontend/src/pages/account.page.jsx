import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";

function Accountpage() {
    const { isLoaded, isSignedIn, user } = useUser()

    if(!isLoaded){
        return <div>Loading...</div>
    }
    
    if(isLoaded && !isSignedIn){
        return <Navigate to="/sign-in"/>
    }

    return ( 
        <main className="px-12">
            <h1 className="text-2xl font-semibold">Account Page</h1>
            <div className="mt-4">
                <p>{user.username}</p>
                <p>{user.emailAddresses[0].emailAddress}</p>
            </div>
            
        </main>
     );
}

export default Accountpage;