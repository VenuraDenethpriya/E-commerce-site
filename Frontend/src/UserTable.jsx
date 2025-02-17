import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetUsersQuery } from "./lib/api";

function UserTable() {
    const { data: users, isError, isLoading, error } = useGetUsersQuery();

    if (isLoading) {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">User ID</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1, 2, 3].map((i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }

    if (isError) {
        return <div className="text-red-500">Error: {error?.message || 'Failed to load users'}</div>;
    }

    return (
        <Table>
            <TableCaption>A list of all users.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">User ID</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.data.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                            {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell>
                            {user.emailAddresses?.[0]?.emailAddress || 'No email'}
                        </TableCell>
                        <TableCell className="text-right">
                            {user.publicMetadata?.role || 'user'}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default UserTable;
