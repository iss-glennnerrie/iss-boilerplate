"use client"

import { useState, useEffect, useMemo, memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { cn } from "@/lib/utils"
import DatatablePaginate from "./datatable-paginate"

type DatatablePagination = {
  currentPage: number
  totalRecords: number
  perPage: number
  setPaginate: (paginate: number) => void;
  onPageChange: (page: number) => void
  setPagination: (currentPage: number, itemsPerPage?: number) => void
}

// Memoized page button component
const PageButton = memo(
  ({
    page,
    currentPage,
    onPageChange,
  }: {
    page: number | string
    currentPage: number
    onPageChange: (page: number) => void
  }) => {
    if (typeof page === "number") {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(page)}
          className={cn(
            "h-8 w-8 mx-0.5 p-0 font-medium rounded-md",
            currentPage === page
              ? "bg-primary text-white hover:bg-slate-200 hover:text-black"
              : "text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700",
          )}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Button>
      )
    }

    return <span className="mx-1 text-gray-400 dark:text-gray-500">{page}</span>
  },
)

PageButton.displayName = "PageButton"

const DatatablePagination = memo(({ currentPage, totalRecords, perPage, onPageChange, setPaginate}: DatatablePagination) => {
  const totalPages = Math.ceil(totalRecords / perPage)
  const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * perPage + 1
  const endRecord = Math.min(currentPage * perPage, totalRecords)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])


  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = []
    const maxVisiblePages = isMobile ? 3 : 5

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2))
      const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1)

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(2, endPage - (maxVisiblePages - 1))
      }

      if (startPage > 2) {
        pages.push("...")
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push("...")
      }

      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }
    return pages
  }, [currentPage, totalPages, isMobile])


  const handleFirstPage = useCallback(() => onPageChange(1), [onPageChange])
  const handlePrevPage = useCallback(() => onPageChange(currentPage - 1), [onPageChange, currentPage])
  const handleNextPage = useCallback(() => onPageChange(currentPage + 1), [onPageChange, currentPage])
  const handleLastPage = useCallback(() => onPageChange(totalPages), [onPageChange, totalPages])



  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden mt-10 sticky bottom-0 z-50">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Records Info */}
        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 md:w-1/3 flex justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
              {totalRecords} Results
            </span>
            <span>
              Showing {startRecord}-{endRecord}
            </span>
          </div>
        </div>

        {/* Items Per Page */}
        {/* <div className="flex items-center gap-2 md:w-1/3 justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-400">Items per page:</span>
          <Select onValueChange={handleItemsPerPageChange} value={String(perPage)}>
            <SelectTrigger className="h-9 w-[70px] rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 50, 100].map((value) => (
                <SelectItem key={value} value={String(value)}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        <DatatablePaginate paginate={perPage} setPaginate={setPaginate} />

        {/* Pagination Controls */}
        <div className="flex items-center justify-center md:justify-end md:w-1/3 ">
          <div className="flex items-center rounded-lg p-1 gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFirstPage}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-md text-gray-500 hover:text-primary hover:bg-slate-200 dark:hover:bg-gray-700"
              aria-label="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="h-8 w-8 rounded-md text-gray-500 hover:text-primary hover:bg-slate-200 dark:hover:bg-gray-700"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center mx-1">
              {pageNumbers.map((page, index) => (
                <PageButton
                  key={`${page}-${index}`}
                  page={page}
                  currentPage={currentPage}
                  onPageChange={onPageChange}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 rounded-md text-gray-500 hover:text-primary hover:bg-slate-200 dark:hover:bg-gray-700"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
              className="h-8 w-8 rounded-md text-gray-500 hover:text-primary hover:bg-slate-200 dark:hover:bg-gray-700"
              aria-label="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

})

DatatablePagination.displayName = "DatatablePagination"

export default DatatablePagination

