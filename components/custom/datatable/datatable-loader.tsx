"use client"
import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const DatatableLoader = () => {
  return (
    <div className="grid-cols-12 grid gap-3">
        <div className="col-span-3 flex flex-col gap-3">
            <Skeleton className='h-[40px] rounded-lg w-full'/>
        </div>
        <div className="col-span-8"></div>
        <div className="col-span-1 flex flex-col gap-3">
            <Skeleton className='h-[40px] rounded-lg w-full'/>
        </div>
        <div className="col-span-12">
            <Skeleton className='h-[300px] rounded-lg w-full'/>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
            <Skeleton className='h-[40px] rounded-lg w-full'/>
        </div>
        <div className="col-span-6 flex flex-col gap-3"> </div>
        <div className="col-span-2 flex flex-col gap-3">
            <Skeleton className='h-[40px] rounded-lg w-full'/>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
            <Skeleton className='h-[40px] rounded-lg w-full'/>
        </div>
    </div>
  )
}

export default DatatableLoader
