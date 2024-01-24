import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<any>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-left">ID</div>,
    },
    {
        accessorKey: "name",
        header: () => <div className="text-left">Name</div>,
    },
    {
        accessorKey: "email",
        header: () => <div className="text-left">Email</div>,
    },
    {
        accessorKey: "dateOfBirth",
        header: () => <div className="text-left">Date Of Birth</div>,
        cell: ({ row }) => {
            const dateOfBirth = row.getValue("dateOfBirth")
            const formatted = new Date(dateOfBirth as string).toLocaleDateString()

            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "updatedDate",
        header: () => <div className="text-left">Modified Date</div>,
        cell: ({ row }) => {
            const updatedDate = row.getValue("updatedDate")
            const formatted = new Date(updatedDate as string).toLocaleDateString()

            return <div className="text-left font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
    },
]
