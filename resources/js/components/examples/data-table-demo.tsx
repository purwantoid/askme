import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/ui/data-table"
import {
  createSelectColumn,
  createActionsColumn,
  createSortableColumn,
  createBadgeColumn,
  createDateColumn,
  createCurrencyColumn,
  useDataTable,
} from "@/hooks/use-data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data type
interface User {
  id: string
  name: string
  email: string
  status: "active" | "inactive" | "pending"
  role: "admin" | "user" | "moderator"
  createdAt: Date
  lastLogin: Date | null
  revenue: number
}

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    createdAt: new Date("2023-01-15"),
    lastLogin: new Date("2024-01-10"),
    revenue: 1250.50,
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "user",
    createdAt: new Date("2023-03-20"),
    lastLogin: new Date("2024-01-09"),
    revenue: 890.25,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "user",
    createdAt: new Date("2023-05-10"),
    lastLogin: null,
    revenue: 0,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    status: "pending",
    role: "moderator",
    createdAt: new Date("2023-11-01"),
    lastLogin: new Date("2024-01-08"),
    revenue: 2100.75,
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "active",
    role: "user",
    createdAt: new Date("2023-07-22"),
    lastLogin: new Date("2024-01-07"),
    revenue: 456.80,
  },
]

export default function DataTableDemo() {
  const { selectedRows, loading, handleBulkAction } = useDataTable()
  const [data, setData] = React.useState<User[]>(sampleUsers)

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

  // Column definitions
  const columns: ColumnDef<User>[] = [
    createSelectColumn<User>(),
    createSortableColumn<User>("name", "Name"),
    createSortableColumn<User>("email", "Email"),
    createBadgeColumn<User>("status", "Status", getStatusVariant),
    createBadgeColumn<User>("role", "Role", getRoleVariant),
    createDateColumn<User>(
      "createdAt",
      "Created At",
      (date) => date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    ),
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ getValue }) => {
        const value = getValue() as Date | null
        if (!value) return <span className="text-muted-foreground">Never</span>
        return <div>{value.toLocaleDateString()}</div>
      },
    },
    createCurrencyColumn<User>("revenue", "Revenue"),
    createActionsColumn<User>([
      {
        label: "View Profile",
        onClick: (user) => alert(`Viewing profile for ${user.name}`),
      },
      {
        label: "Edit User",
        onClick: (user) => alert(`Editing user ${user.name}`),
      },
      {
        label: "Delete User",
        onClick: (user) => {
          if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            setData(prev => prev.filter(u => u.id !== user.id))
          }
        },
        variant: "destructive",
      },
    ]),
  ]

  const handleRowClick = (user: User) => {
    console.log("Row clicked:", user)
  }

  const handleBulkDelete = () => {
    handleBulkAction((rows) => {
      const selectedIds = rows.map(row => row.original.id)
      setData(prev => prev.filter(user => !selectedIds.includes(user.id)))
    })
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      {/* Basic Example */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Data Table</CardTitle>
          <CardDescription>
            A simple data table with sorting, filtering, and pagination.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            searchKey="name"
            searchPlaceholder="Search users by name..."
            onRowClick={handleRowClick}
            loading={loading}
            emptyMessage="No users found."
          />
        </CardContent>
      </Card>

      {/* Advanced Example */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Data Table</CardTitle>
          <CardDescription>
            Data table with custom page size and disabled features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedRows.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedRows.length} row(s) selected
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  Delete Selected
                </Button>
              </div>
            )}
            <DataTable
              columns={columns}
              data={data}
              searchKey="email"
              searchPlaceholder="Search by email..."
              pageSize={5}
              pageSizeOptions={[5, 10, 15]}
              enableColumnVisibility={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* Minimal Example */}
      <Card>
        <CardHeader>
          <CardTitle>Minimal Data Table</CardTitle>
          <CardDescription>
            Simple table without pagination, sorting, or filtering.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns.slice(1, 4)} // Only name, email, status
            data={data.slice(0, 3)} // Only first 3 rows
            enablePagination={false}
            enableSorting={false}
            enableFiltering={false}
            enableColumnVisibility={false}
          />
        </CardContent>
      </Card>

      {/* Loading Example */}
      <Card>
        <CardHeader>
          <CardTitle>Loading State</CardTitle>
          <CardDescription>
            Data table showing loading state.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={[]}
            loading={true}
            searchKey="name"
          />
        </CardContent>
      </Card>

      {/* Empty State Example */}
      <Card>
        <CardHeader>
          <CardTitle>Empty State</CardTitle>
          <CardDescription>
            Data table with no data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={[]}
            loading={false}
            searchKey="name"
            emptyMessage="No users have been added yet. Create your first user to get started."
          />
        </CardContent>
      </Card>
    </div>
  )
}