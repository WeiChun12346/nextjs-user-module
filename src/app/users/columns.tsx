import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { getUsers } from "../api/users/route"
import UsersForm from "./page"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "id",
        // header: () => <div className="text-left">ID</div>,
        header: ({column}) => {
            return (
                <Button
                    className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableColumnFilter : false
    },
    {
        accessorKey: "name",
        // header: () => <div className="text-left">Name</div>,
        header: ({column}) => {
            return (
                <Button
                    className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableColumnFilter : true,
        enableSorting: true,
        // filterFn: async (row: any, columnId: any, value: any, addMeta: any) => {
        //     // return await getUsers({[columnId]: value});
        // },
    },
    {
        accessorKey: "email",
        // header: () => <div className="text-left">Email</div>,
        header: ({column}) => {
            return (
                <Button
                    className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableColumnFilter : true
    },
    {
        accessorKey: "dateOfBirth",
        // header: () => <div className="text-left">Date Of Birth</div>,
        header: ({column}) => {
            return (
                <Button
                    className="pl-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date Of Birth
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: (row: any) => {
            const dateOfBirth = row.getValue("dateOfBirth")
            const formatted = new Date(dateOfBirth as string).toLocaleDateString()

            return <div className="text-left font-medium">{formatted}</div>
        },
        enableColumnFilter : false,
    },
    {
        accessorKey: "updatedDate",
        header: () => <div className="text-left">Modified Date</div>,
        cell: (row: any) => {
            const updatedDate = row.getValue("updatedDate")
            const formatted = new Date(updatedDate as string).toLocaleDateString()

            return <div className="text-left font-medium">{formatted}</div>
        },
        enableColumnFilter : false
    },
    {
        accessorKey: "actions",
        header: "Actions",
        enableColumnFilter : false
    },
]

