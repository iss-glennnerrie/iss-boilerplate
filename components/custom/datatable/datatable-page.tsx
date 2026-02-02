
import { Button } from '@/components/ui/button';
import useDatatableSet from '@/hooks/use-datatable-set';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

interface DatatablePageProps {
    tableId: string;
    lastPage: number;
    currentPage?: number;
}

const DatatablePage = ({  lastPage, tableId }: DatatablePageProps) => {

    const isMobile = useIsMobile();
    const { page, setPage } = useDatatableSet(tableId);

    const getPageNumbers = () => {
        const pages = [];
        const allowance = isMobile? 1 : 2;
        // Always show the first page
        pages.push(1);

        if (page > 4) {
            pages.push('start-ellipsis');
        }

        // Show pages around the current one
        const start = Math.max(2, page - allowance);
        const end = Math.min(lastPage - 1, page + allowance);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < lastPage - 3) {
            pages.push('end-ellipsis');
        }

        // Always show the last page if it's not already included
        if (lastPage > 1) {
            pages.push(lastPage);
        }

        return pages;
    };

    return (
        <div className='flex flex-row xl:gap-2 xl:justify-end justify-center text-end xl:ml-0 ml-auto w-full'>
            {!isMobile && (
                <span className='mt-2 me-3 text-sm text-primary'>Page {page} of {lastPage}</span>
            )}
            <div className='flex items-center gap-1'>
               
                <Button variant="outline" className='p-2 min-w-[35px]' size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
                    <ChevronLeft className='h-4 w-4' />
                </Button>

                {getPageNumbers().map((item, idx) => {
                    if (item === 'start-ellipsis' || item === 'end-ellipsis') {
                        return <span key={idx} className="px-2">...</span>;
                    }

                    return (
                        <Button
                            key={idx}
                            variant="outline"
                            className={cn(
                                "p-2 min-w-[35px]",
                                item === page && "bg-primary text-white hover:bg-primary hover:text-white"
                            )}
                            size="sm"
                            onClick={() => setPage(item as number)}
                        >
                            {item}
                        </Button>
                    );
                })}

                <Button variant="outline" className='p-2 min-w-[35px]' size="sm" onClick={() => setPage(page + 1)} disabled={page === lastPage}>
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>
        </div>
    );
};

export default DatatablePage
