/* eslint-disable react-hooks/exhaustive-deps */
'use Client'

import React, { ReactNode, useEffect, useState } from 'react'
import { CreateDataTable } from './datatable-create'

import { ColumnDef } from '@tanstack/react-table'
import DatatablePaginate from './datatable-paginate'
import DatatablePage from './datatable-page'
import useDatatableSet from '@/hooks/layout/use-datatable-set'
import { useDebounce } from '@/hooks/layout/use-debounde'
import { Input } from '@/components/ui/input'
import { AppError } from '../placeholders/app-error'

interface DatatableData<T> {
    data: T[];
    total: number;
    current_page: number;
    last_page: number;
}

interface DatatableProps<T> {
    data: DatatableData<T>;
    columns: ColumnDef<T>[];
    children?: ReactNode; 
    tableId: string;
    isLoading: boolean;
    isError? : boolean;
}
  
const Datatable = <T,>({ data, columns, isLoading, tableId, isError}: DatatableProps<T>) => {    

    

    const { keyword, paginate, setKeyword, setPaginate, setPage } =  useDatatableSet(tableId);
    const [search, setSearch] = useState(keyword);
    const debouncedSearch = useDebounce(search);

    useEffect(() => {
        if (debouncedSearch !== keyword) {
            setKeyword(debouncedSearch);
        }
    }, [debouncedSearch, keyword]);
   
    if (isError) {
        return <AppError/>
    }

    return (
        <>
            <CreateDataTable columns={columns} data={data?.data} isLoading={isLoading}>
                <Input 
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);  // Ensure that this sets the page to 1
                    }}
                    placeholder='🔍 Search ...'
                    className='w-full' 
                />
            </CreateDataTable>
       
            <div className="grid grid-cols-12 mt-2 gap-2">
                <div className="xl:col-span-3 col-span-12 items-center justify-center flex xl:justify-start text-primary">
                    {data?.total} record(s) found
                </div>
                <div className="xl:col-span-3 col-span-12 items-center justify-center flex">
                    <DatatablePaginate paginate={paginate} setPaginate={setPaginate} setPage={setPage}/>
                </div>
                <div className="xl:col-span-6 col-span-12 items-center justify-center flex xl:justify-end">
                    <DatatablePage currentPage={data?.current_page} lastPage={data?.last_page} tableId={tableId}/>
                </div>
            </div>
       </>
    )
}

export default Datatable
