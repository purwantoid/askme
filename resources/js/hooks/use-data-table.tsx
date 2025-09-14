import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Common column types and helpers
export interface SelectColumn {
  id: "select"
  header: ({ table }: { table: any }) => React.ReactElement
  cell: ({ row }: { row: any }) => React.ReactElement
  enableSorting: false
  enableHiding: false
}

export interface ActionsColumn<TData> {
  id: "actions"
  cell: ({ row }: { row: { original: TData } }) => React.ReactElement
  enableHiding: false
}

// Helper function to create a select column
export function createSelectColumn<TData>(): ColumnDef<TData> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }
}

// Helper function to create an actions column
export function createActionsColumn<TData>(
  actions: Array<{
    label: string
    onClick: (data: TData) => void
    variant?: "default" | "destructive"
  }>
): ColumnDef<TData> {
  return {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => action.onClick(data)}
                className={action.variant === "destructive" ? "text-destructive" : ""}
              >
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    enableHiding: false,
  }
}

// Helper function to create a sortable column
export function createSortableColumn<TData>(
  accessorKey: keyof TData,
  header: string,
  cell?: (value: any) => React.ReactNode
): ColumnDef<TData> {
  return {
    accessorKey: accessorKey as string,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 hover:bg-transparent"
        >
          {header}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: cell ? ({ getValue }) => cell(getValue()) : undefined,
  }
}

// Helper function to create a badge column
export function createBadgeColumn<TData>(
  accessorKey: keyof TData,
  header: string,
  badgeVariant?: (value: any) => "default" | "secondary" | "destructive" | "outline"
): ColumnDef<TData> {
  return {
    accessorKey: accessorKey as string,
    header,
    cell: ({ getValue }) => {
      const value = getValue() as string
      const variant = badgeVariant ? badgeVariant(value) : "default"
      return <Badge variant={variant}>{value}</Badge>
    },
  }
}

// Helper function to create a date column
export function createDateColumn<TData>(
  accessorKey: keyof TData,
  header: string,
  format: (date: Date) => string = (date) => date.toLocaleDateString()
): ColumnDef<TData> {
  return {
    accessorKey: accessorKey as string,
    header,
    cell: ({ getValue }) => {
      const value = getValue() as string | Date
      const date = typeof value === "string" ? new Date(value) : value
      return <div>{format(date)}</div>
    },
  }
}

// Helper function to create a currency column
export function createCurrencyColumn<TData>(
  accessorKey: keyof TData,
  header: string,
  currency: string = "USD"
): ColumnDef<TData> {
  return {
    accessorKey: accessorKey as string,
    header,
    cell: ({ getValue }) => {
      const value = getValue() as number
      return (
        <div className="font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
          }).format(value)}
        </div>
      )
    },
  }
}

// Custom hook for data table state management
export function useDataTable() {
  const [selectedRows, setSelectedRows] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)

  const handleBulkAction = React.useCallback((action: (rows: any[]) => void) => {
    action(selectedRows)
    setSelectedRows([])
  }, [selectedRows])

  return {
    selectedRows,
    setSelectedRows,
    loading,
    setLoading,
    handleBulkAction,
  }
}