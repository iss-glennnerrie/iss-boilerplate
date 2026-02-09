"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Settings2 } from "lucide-react"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"
import LoadingFormData from "../placeholders/loading-form-data"
import NoRecordFound from "../placeholders/no-record-found"
import { Separator } from "@/components/ui/separator"




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  children : React.ReactNode,
  isLoading: boolean,
}

export function CreateDataTable<TData, TValue>({
  columns,
  data, 
  children,
  isLoading
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
            sorting 
        },
        defaultColumn: {
            enableSorting: true, // Set sorting to true by default
        },
        onSortingChange: setSorting, 
        getSortedRowModel: getSortedRowModel(),
    })
    const isMobile = useIsMobile();

   
    return (
        <div >
            <div className="grid grid-cols-12 xl:gap-3 md:gap-3 gap-2">
                <div className="mb-2 col-span-9 xl:col-span-3 md:col-span-8 flex">
                    {children}
                </div>
                <div className="mb-2 col-span-3 xl:col-span-2  md:col-span-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <Settings2 className="h-4 w-4" /> 
                                {isMobile ? "" : <span className="ms-2">View</span>}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel className="text-center">
                                <small className="text-sm font-bold mb-3">Toggle Column</small>
                            </DropdownMenuLabel>
                            {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id.replace(/_/g, ' ')}
                                </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {isMobile ? (<>
                    {
                        isLoading ? (
                            <div className="h-[10vh] flex justify-center items-center col-span-12">
                                <LoadingFormData description="Loading data ...."/>
                            </div>
                        ): (
                            <div className="block md:hidden col-span-12 ">
                                {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <div
                                        key={row.id}
                                        className="border rounded-lg p-4 shadow-sm space-y-2  mb-2"
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                    {row.getVisibleCells().map((cell) => {
                                        
                                        const columnDef = cell.column?.columnDef;
                                        const context = cell.getContext();
                                        return (
                                            <div key={cell.id} className="grid grid-cols-12 gap-2">
                                                <div className="col-span-5">
                                                    
                                                    <span className="text-xs text-muted-foreground">
                                                        {/* @ts-ignore */}
                                                        {columnDef?.header}
                                                    </span>
                                                </div>
                                                <div className="col-span-7 items-center justify-end flex text-end">
                                                    <div className="text-sm">
                                                    {columnDef?.cell
                                                        ? flexRender(columnDef.cell, context)
                                                        : ""}

                                                    </div>
                                                </div>
                                                <div className="col-span-12">
                                                    <Separator/>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    </div>
                                ))
                                ) : (
                                    <div className="h-[30vh] flex items-center justify-center bg-white rounded-lg">
                                        <NoRecordFound/>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    </>): (
                        <div className="col-span-12">
                            <div className="rounded-md border">
                                {isLoading? 
                                    <div className="h-[10vh] flex justify-center items-center">
                                        <LoadingFormData description="Fetching Data ..."/>
                                    </div>
                                :
                                    <Table>
                                        <TableHeader>
                                            {table.getHeaderGroups().map((headerGroup) => (
                                                <TableRow key={headerGroup.id}>
                                                    {headerGroup.headers.map((header) => {
                                                        return (
                                                        <TableHead
                                                            key={header.id}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            className="cursor-pointer select-none"
                                                        >
                                                            {header.isPlaceholder ? null : (
                                                                <div className="flex items-center gap-1">
                                                                    {flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                                    {header.column.getIsSorted() as string ? 
                                                                        <ArrowUpDown className="h-4 w-4 me-2"/>
                                                                    : ""}
                                                                </div>
                                                            )}
                                                        </TableHead>
                                                        );
                                                    })}
                                                </TableRow>
                                            ))}
                                        </TableHeader>

                                        <TableBody>
                                            {table.getRowModel()?.rows?.length ? (
                                                table.getRowModel()?.rows.map((row) => (
                                                <TableRow
                                                    key={row.id}
                                                    data-state={row.getIsSelected() && "selected"}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id} className={` min-w-[150px]  md:min-w-0 xl:min-w-0`}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                                        <div className="h-[30vh] flex items-center justify-center bg-white rounded-lg">
                                                            <NoRecordFound/>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
           
        </div>
    )
}
