"use client"

import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState, MaterialReactTable, useMaterialReactTable } from "material-react-table"
import React, { useEffect, useState } from "react"
import { deleteUser, getUsers } from "../api/users/route"
import { useRouter } from "next/navigation";

type User = {
    id: string,
    name: string;
    dateOfBirth: Date;
    updatedDate: Date;
};

export function DataTable({ columns, setIsRefresh, isRefresh }: { columns: any, setIsRefresh: any, isRefresh: any }) {
    const router = useRouter();
    const editButton = {
        label: 'Edit',
        onClick: (id: any) => {
            router.push(`users/${id}`)
        },
        className: "bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    }
    const deleteButton = {
        label: 'Delete',
        onClick: async (id: any) => {
            await deleteUser(id);
            setIsRefresh(true);
        },
        className: "bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
    }
    //data and fetching state
    const [data, setData] = useState<User[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }
            try {
                const filters = columnFilters.reduce((acc: any, obj: any) => {
                    acc[obj.id] = obj.value;
                    return acc;
                }, {})
                const { data } = await getUsers({
                    ...filters,
                    page: pagination.pageIndex + 1,
                    limit: pagination.pageSize,
                    sortBy: sorting[0]?.id,
                    sortDirection: !!sorting[0]?.desc ? 'asc' : 'desc'
                });
                setData(data.data);
                setRowCount(data.total);
            } catch (error) {
                setIsError(true);
                console.error(error);
                return;
            }
            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        if (isRefresh) {
            setSorting([])
            setColumnFilters([]);
            setPagination({
                pageIndex: 0,
                pageSize: 10
            })
        }
        fetchData();
        setIsRefresh(false);
    }, [
        columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
        isRefresh,
        setIsRefresh
    ]);

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: false,
        getRowId: (row) => row.id,
        initialState: { showColumnFilters: true },
        manualFiltering: true,
        manualPagination: true,
        manualSorting: true,
        muiToolbarAlertBannerProps: isError
            ? {
                color: 'error',
                children: 'Error loading data',
            }
            : undefined,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        muiPaginationProps: {
            rowsPerPageOptions: [5, 10, 20],
            showFirstButton: false,
            showLastButton: false,
        },
        rowCount,
        state: {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isRefetching,
            sorting,
        },
        enableTopToolbar: false,
        enableRowActions: true,
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: 'Actions',
                size: 130,
            },
        },
        renderRowActions: ({ row }) => [
            <div key='actions' className="space-x-4">
                <button className={editButton.className} key="edit" onClick={() => editButton.onClick(row.id)}>
                    Edit
                </button>
                <button className={deleteButton.className} key="delete" onClick={() => deleteButton.onClick(row.id)}>
                    Delete
                </button>
            </div>
        ],
    });

    return (
        <MaterialReactTable table={table} />
    )
}
