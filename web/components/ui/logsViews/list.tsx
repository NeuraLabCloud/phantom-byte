import React from 'react';
import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender,
    getPaginationRowModel,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

interface LogItem {
    type: string,
    title: string,
    description: string
}

function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),// page=10 by default
    })

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

async function getData(): Promise<LogItem[]> {
    // Fetch data from your API here.
    return [
        {
            type: "Error",
            title: "Critical System Failure",
            description: "The system encountered a critical error and is now offline."
        },
        {
            type: "Info",
            title: "User Login",
            description: "User 'johndoe' logged in successfully."
        },
        {
            type: "Warning",
            title: "Disk Space Low",
            description: "Available disk space is running low on Drive C."
        },
        {
            type: "Error",
            title: "Database Connection Failed",
            description: "Failed to establish a connection to the database server."
        },
        {
            type: "Info",
            title: "File Uploaded",
            description: "File 'document.pdf' was successfully uploaded."
        },
        {
            type: "Warning",
            title: "Disk Space Low",
            description: "Available disk space is running low on Drive C."
        },
        {
            type: "Error",
            title: "Database Connection Failed",
            description: "Failed to establish a connection to the database server."
        },
        {
            type: "Info",
            title: "File Uploaded",
            description: "File 'document.pdf' was successfully uploaded."
        },
        {
            type: "Warning",
            title: "Disk Space Low",
            description: "Available disk space is running low on Drive C."
        },
        {
            type: "Error",
            title: "Database Connection Failed",
            description: "Failed to establish a connection to the database server."
        },
        {
            type: "Info",
            title: "File Uploaded",
            description: "File 'document.pdf' was successfully uploaded."
        }
    ]
}

export default async function List() {
    const data = await getData();

    const columns: ColumnDef<LogItem> = [...Object.keys(data[0]).map((logItemKey) => {
        return {
            accessorKey: logItemKey,
            header: logItemKey,
            cell: ({ getValue }) => <p>{getValue()}</p>
        }
    }),
    {
        id: "actions",
        cell: ({ row }) => {

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original.id)}
                        >
                            Action One
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Action Two</DropdownMenuItem>
                        <DropdownMenuItem>Action Three</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
    ]

    // const table = useReactTable({ data: logsList, columns, getCoreRowModel: getCoreRowModel() });
    // console.log(table.getHeaderGroups())

    return <DataTable columns={columns} data={await getData()} />;
}