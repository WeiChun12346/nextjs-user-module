import { MRT_ColumnDef } from "material-react-table"

export const columns: MRT_ColumnDef<any>[] = [
    {
        accessorKey: "id",
        header: "ID",
        enableColumnFilter : false,
        enableColumnActions: false,
        sortDescFirst: true,
    },
    {
        accessorKey: "name",
        header: "Name",
        enableColumnActions: false
    },
    {
        accessorKey: "email",
        header: "Email",
        enableColumnActions: false
    },
    {
        accessorKey: "dateOfBirth",
        header: "Date Of Birth",
        accessorFn: (row) => new Date(row.dateOfBirth),
        Cell: ({ cell }: any) => {
            const dateOfBirth = cell.getValue("dateOfBirth")
            return new Date(dateOfBirth as string).toLocaleDateString()
        },
        filterFn: 'lessThan',
        filterVariant: 'date',
        enableGlobalFilter: false,
    },
    {
        accessorKey: "updatedDate",
        header: "Modified Date",
        accessorFn: (row) => new Date(row.updatedDate),
        Cell: ({ cell }: any) => {
            const updatedDate = cell.getValue("updatedDate")
            const formatted = new Date(updatedDate as string).toLocaleDateString()
            return formatted
        },
        filterFn: 'lessThan',
        filterVariant: 'date',
        enableGlobalFilter: false,
    },
]

