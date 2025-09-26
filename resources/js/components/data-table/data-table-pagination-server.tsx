import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

interface DataTablePaginationProps {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalRows: number;
    selectedCount: number;
    setPageIndex: (pageIndex: number) => void;
    setPageSize: (pageSize: number) => void;
}

export function DataTablePagination({
    pageIndex,
    pageSize,
    totalPages,
    totalRows,
    selectedCount,
    setPageIndex,
    setPageSize,
}: DataTablePaginationProps) {
    const canPreviousPage = pageIndex > 0;
    const canNextPage = pageIndex < totalPages - 1;

    return (
        <div className="flex items-center justify-between px-2 py-3">
            {/* Left info */}
            <div className="text-sm text-muted-foreground">
                {selectedCount} of {totalRows} row(s) selected.
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-6">
                {/* Rows per page */}
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={String(pageSize)}
                        onValueChange={(val) => {
                            setPageSize(Number(val));
                            setPageIndex(0);
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={pageSize} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 50, 100].map((size) => (
                                <SelectItem key={size} value={String(size)}>
                                    {size}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Page info */}
                <div className="text-sm font-medium">
                    Page {pageIndex + 1} of {totalPages}
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPageIndex(0)} disabled={!canPreviousPage}>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPageIndex(pageIndex - 1)} disabled={!canPreviousPage}>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPageIndex(pageIndex + 1)} disabled={!canNextPage}>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPageIndex(totalPages - 1)} disabled={!canNextPage}>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
