import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { router, usePage } from "@inertiajs/react"
import { DataTable } from "@/components/ui/data-table"
import {
  createSelectColumn,
  createActionsColumn,
  createBadgeColumn,
  createDateColumn,
} from "@/hooks/use-data-table"
import { PageProps as GlobalPageProps } from "@/types"

// Define types for server-side pagination
interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    from: number
    last_page: number
    per_page: number
    to: number
    total: number
  }
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}

interface User {
  id: number
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  role: "admin" | "user" | "moderator"
  created_at: string
  updated_at: string
}

interface ServerDataTablePageProps extends GlobalPageProps {
  users: PaginatedResponse<User>
  filters: {
    search?: string
    status?: string
    role?: string
    sort_by?: string
    sort_direction?: "asc" | "desc"
  }
}

export default function ServerDataTable() {
  const { users, filters } = usePage<ServerDataTablePageProps>().props

  // Define status badge variants
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default" as const
      case "inactive":
        return "secondary" as const
      case "pending":
        return "destructive" as const
      default:
        return "outline" as const
    }
  }

  // Define role badge variants
  const getRoleVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive" as const
      case "moderator":
        return "default" as const
      case "user":
        return "secondary" as const
      default:
        return "outline" as const
    }
  }

  // Column definitions with server-side sorting
  const columns: ColumnDef<User>[] = [
    createSelectColumn<User>(),
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => <div className="font-medium">{getValue() as string}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    createBadgeColumn<User>("status", "Status", getStatusVariant),
    createBadgeColumn<User>("role", "Role", getRoleVariant),
    createDateColumn<User>(
      "created_at",
      "Created At",
      (date) => new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    ),
    createActionsColumn<User>([
      {
        label: "View",
        onClick: (user) => router.visit(`/users/${user.id}`),
      },
      {
        label: "Edit",
        onClick: (user) => router.visit(`/users/${user.id}/edit`),
      },
      {
        label: "Delete",
        onClick: (user) => {
          if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/users/${user.id}`)
          }
        },
        variant: "destructive",
      },
    ]),
  ]

  // Handle search
  const handleSearch = React.useCallback(
    (value: string) => {
      router.get("/users", { ...filters, search: value, page: 1 }, {
        preserveState: true,
        replace: true,
      })
    },
    [filters]
  )

  // Debounce search
  const [searchValue, setSearchValue] = React.useState(filters.search || "")
  const searchTimeoutRef = React.useRef<NodeJS.Timeout>()

  React.useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(searchValue)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchValue, handleSearch])

  // Handle sorting
  const handleSort = (columnId: string) => {
    let sort_direction: "asc" | "desc" = "asc"
    
    if (filters.sort_by === columnId && filters.sort_direction === "asc") {
      sort_direction = "desc"
    }

    router.get("/users", {
      ...filters,
      sort_by: columnId,
      sort_direction,
      page: 1,
    }, {
      preserveState: true,
      replace: true,
    })
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    router.get("/users", { ...filters, page }, {
      preserveState: true,
      replace: true,
    })
  }

  const handlePageSizeChange = (pageSize: number) => {
    router.get("/users", { ...filters, per_page: pageSize, page: 1 }, {
      preserveState: true,
      replace: true,
    })
  }

  // Transform data for client-side table
  const tableData = users.data

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            Manage your users with server-side pagination, filtering, and sorting.
          </p>
        </div>

        {/* Custom filters */}
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md"
            />
          </div>
          
          <select
            value={filters.status || ""}
            onChange={(e) => router.get("/users", { 
              ...filters, 
              status: e.target.value || undefined,
              page: 1 
            }, { preserveState: true, replace: true })}
            className="px-3 py-2 border border-input rounded-md"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={filters.role || ""}
            onChange={(e) => router.get("/users", { 
              ...filters, 
              role: e.target.value || undefined,
              page: 1 
            }, { preserveState: true, replace: true })}
            className="px-3 py-2 border border-input rounded-md"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Server-side data table */}
        <ServerDataTableComponent
          columns={columns}
          data={tableData}
          pagination={users.meta}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSort={handleSort}
          currentSort={{
            column: filters.sort_by,
            direction: filters.sort_direction,
          }}
        />
      </div>
    </div>
  )
}

// Server-side data table component
interface ServerDataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  pagination: PaginatedResponse<any>["meta"]
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  onSort: (columnId: string) => void
  currentSort: {
    column?: string
    direction?: "asc" | "desc"
  }
}

function ServerDataTableComponent<TData>({
  columns,
  data,
  pagination,
  onPageChange,
  onPageSizeChange,
  onSort,
  currentSort,
}: ServerDataTableProps<TData>) {
  return (
    <div className="space-y-4">
      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        enablePagination={false} // We handle pagination manually
        enableSorting={false} // We handle sorting manually
        enableFiltering={false} // We handle filtering manually
        enableColumnVisibility={true}
      />

      {/* Custom server-side pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {pagination.from} to {pagination.to} of {pagination.total} results
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Rows per page:</span>
            <select
              value={pagination.per_page}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="px-2 py-1 border border-input rounded"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => onPageChange(1)}
              disabled={pagination.current_page === 1}
              className="px-2 py-1 border border-input rounded disabled:opacity-50"
            >
              {"<<"}
            </button>
            <button
              onClick={() => onPageChange(pagination.current_page - 1)}
              disabled={pagination.current_page === 1}
              className="px-2 py-1 border border-input rounded disabled:opacity-50"
            >
              {"<"}
            </button>
            
            <span className="px-4 py-1">
              Page {pagination.current_page} of {pagination.last_page}
            </span>
            
            <button
              onClick={() => onPageChange(pagination.current_page + 1)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-2 py-1 border border-input rounded disabled:opacity-50"
            >
              {">"}
            </button>
            <button
              onClick={() => onPageChange(pagination.last_page)}
              disabled={pagination.current_page === pagination.last_page}
              className="px-2 py-1 border border-input rounded disabled:opacity-50"
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}