# DataTable Component

A powerful, flexible data table component built with React Table v8 and shadcn/ui components. Supports pagination, sorting, filtering, column visibility, and more.

## Features

- ✅ **Pagination** - Client-side and server-side pagination
- ✅ **Sorting** - Multi-column sorting with visual indicators
- ✅ **Filtering** - Global search and column-specific filters
- ✅ **Selection** - Row selection with bulk actions
- ✅ **Column Visibility** - Show/hide columns dynamically
- ✅ **Loading States** - Built-in loading and empty states
- ✅ **Responsive** - Mobile-friendly design
- ✅ **TypeScript** - Full TypeScript support
- ✅ **Customizable** - Extensible with custom cells and actions
- ✅ **Server-side** - Laravel/Inertia.js integration ready

## Basic Usage

```tsx
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

interface User {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email", 
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

function UsersTable() {
  const data: User[] = [
    { id: "1", name: "John Doe", email: "john@example.com", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", status: "inactive" },
  ]

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Search users..."
    />
  )
}
```

## Advanced Usage with Helpers

```tsx
import { DataTable } from "@/components/ui/data-table"
import {
  createSelectColumn,
  createActionsColumn,
  createSortableColumn,
  createBadgeColumn,
  createDateColumn,
  createCurrencyColumn,
} from "@/hooks/use-data-table"

const columns: ColumnDef<User>[] = [
  createSelectColumn<User>(),
  createSortableColumn<User>("name", "Name"),
  createBadgeColumn<User>("status", "Status", (status) => 
    status === "active" ? "default" : "secondary"
  ),
  createDateColumn<User>("createdAt", "Created", (date) => 
    date.toLocaleDateString()
  ),
  createCurrencyColumn<User>("revenue", "Revenue", "USD"),
  createActionsColumn<User>([
    {
      label: "Edit",
      onClick: (user) => router.visit(`/users/${user.id}/edit`),
    },
    {
      label: "Delete",
      onClick: (user) => handleDelete(user.id),
      variant: "destructive",
    },
  ]),
]

function AdvancedTable() {
  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      searchPlaceholder="Search users..."
      pageSize={20}
      pageSizeOptions={[10, 20, 50, 100]}
      onRowClick={(user) => router.visit(`/users/${user.id}`)}
      enableColumnVisibility
      enableSorting
      enableFiltering
    />
  )
}
```

## Server-side Integration (Laravel + Inertia.js)

### Backend (Laravel Controller)

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        // Global search
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('email', 'like', "%{$request->search}%");
            });
        }

        // Status filter
        if ($request->status) {
            $query->where('status', $request->status);
        }

        // Role filter  
        if ($request->role) {
            $query->where('role', $request->role);
        }

        // Sorting
        if ($request->sort_by) {
            $direction = $request->sort_direction === 'desc' ? 'desc' : 'asc';
            $query->orderBy($request->sort_by, $direction);
        } else {
            $query->latest();
        }

        // Pagination
        $perPage = $request->per_page ?? 10;
        $users = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => $request->only(['search', 'status', 'role', 'sort_by', 'sort_direction']),
        ]);
    }
}
```

### Frontend (React Component)

```tsx
import { router, usePage } from "@inertiajs/react"
import { DataTable } from "@/components/ui/data-table"

interface PageProps {
  users: PaginatedResponse<User>
  filters: TableFilters
}

export default function UsersIndex() {
  const { users, filters } = usePage<PageProps>().props

  const handleSearch = (value: string) => {
    router.get("/users", { ...filters, search: value, page: 1 }, {
      preserveState: true,
      replace: true,
    })
  }

  const handleSort = (columnId: string) => {
    const direction = filters.sort_by === columnId && filters.sort_direction === "asc" 
      ? "desc" : "asc"
    
    router.get("/users", {
      ...filters,
      sort_by: columnId,
      sort_direction: direction,
      page: 1,
    })
  }

  return (
    <DataTable
      columns={columns}
      data={users.data}
      searchKey="name"
      onSearch={handleSearch}
      onSort={handleSort}
      serverSide={{
        pagination: users.meta,
        onPageChange: (page) => router.get("/users", { ...filters, page }),
        onPageSizeChange: (size) => router.get("/users", { ...filters, per_page: size, page: 1 }),
      }}
    />
  )
}
```

## Column Helper Functions

### createSelectColumn()
Creates a checkbox column for row selection.

```tsx
createSelectColumn<User>()
```

### createSortableColumn()
Creates a sortable column with sort indicators.

```tsx
createSortableColumn<User>("name", "Name", (value) => (
  <div className="font-medium">{value}</div>
))
```

### createBadgeColumn()
Creates a column that displays values as badges.

```tsx
createBadgeColumn<User>("status", "Status", (status) => {
  return status === "active" ? "default" : "secondary"
})
```

### createDateColumn() 
Creates a formatted date column.

```tsx
createDateColumn<User>("createdAt", "Created", (date) => 
  date.toLocaleDateString("en-US", { 
    year: "numeric", 
    month: "short", 
    day: "numeric" 
  })
)
```

### createCurrencyColumn()
Creates a formatted currency column.

```tsx
createCurrencyColumn<User>("revenue", "Revenue", "USD")
```

### createActionsColumn()
Creates a dropdown menu column with actions.

```tsx
createActionsColumn<User>([
  {
    label: "View",
    onClick: (user) => router.visit(`/users/${user.id}`),
  },
  {
    label: "Delete",
    onClick: (user) => handleDelete(user.id),
    variant: "destructive",
  },
])
```

## Props

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | - | Column definitions |
| `data` | `TData[]` | - | Data array |
| `searchKey` | `string` | - | Column key for global search |
| `searchPlaceholder` | `string` | `"Search..."` | Search input placeholder |
| `enableFiltering` | `boolean` | `true` | Enable filtering |
| `enableSorting` | `boolean` | `true` | Enable sorting |
| `enableColumnVisibility` | `boolean` | `true` | Enable column visibility toggle |
| `enablePagination` | `boolean` | `true` | Enable pagination |
| `pageSize` | `number` | `10` | Default page size |
| `pageSizeOptions` | `number[]` | `[10, 20, 30, 40, 50]` | Page size options |
| `onRowClick` | `(row: TData) => void` | - | Row click handler |
| `loading` | `boolean` | `false` | Loading state |
| `emptyMessage` | `string` | `"No results found."` | Empty state message |
| `className` | `string` | - | Additional CSS classes |

## Styling

The DataTable component uses Tailwind CSS classes and follows shadcn/ui design patterns. You can customize the appearance by:

1. **Passing custom className**: Override or extend default styles
2. **Modifying theme variables**: Update CSS custom properties
3. **Custom cell renderers**: Create custom column definitions

```tsx
// Custom styling example
<DataTable
  columns={columns}
  data={data}
  className="border-2 border-primary"
  // Custom column with styling
  columns={[
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => (
        <Badge className="uppercase font-bold">
          {getValue() as string}
        </Badge>
      ),
    },
  ]}
/>
```

## Examples

See the following example files:
- `data-table-demo.tsx` - Basic client-side examples
- `data-table-server.tsx` - Server-side integration with Laravel/Inertia.js

## Dependencies

- `@tanstack/react-table` - Table logic and state management
- `lucide-react` - Icons
- `shadcn/ui components` - UI primitives (Button, Input, Select, etc.)

## Best Practices

1. **Use TypeScript** - Define proper interfaces for your data
2. **Memoize columns** - Wrap column definitions in `useMemo` for performance
3. **Server-side for large datasets** - Use server-side pagination/filtering for 1000+ rows
4. **Responsive design** - Consider mobile layouts and horizontal scrolling
5. **Loading states** - Always handle loading and error states
6. **Accessibility** - Ensure proper ARIA labels and keyboard navigation

```tsx
// Performance optimization example
const columns = useMemo(
  () => [
    createSelectColumn<User>(),
    createSortableColumn<User>("name", "Name"),
    // ... other columns
  ],
  []
)
```