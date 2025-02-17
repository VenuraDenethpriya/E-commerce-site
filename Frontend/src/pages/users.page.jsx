import UserTable from "@/UserTable";

function UsersPage() {
    
    return ( 
        <section className="w-full min-h-screen px-4 pb-8">
            <div className="flex py-4 pr-4 justify-between">
                <h1 className="text-2xl font-bold pl-6">All Users</h1>
            </div>
            <UserTable/>
        </section>
     );
}

export default UsersPage;