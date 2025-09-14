// Common types for DataTable components

export interface PaginatedResponse<T> {
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

export interface TableFilters {
  search?: string
  sort_by?: string
  sort_direction?: "asc" | "desc"
  per_page?: number
  page?: number
  [key: string]: any
}

export interface DataTableAction<T> {
  label: string
  onClick: (data: T) => void
  variant?: "default" | "destructive"
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableBulkAction<T> {
  label: string
  onClick: (selectedData: T[]) => void
  variant?: "default" | "destructive"
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  filterable?: boolean
  searchable?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

export interface DataTableConfig {
  enableSelection?: boolean
  enableSorting?: boolean
  enableFiltering?: boolean
  enablePagination?: boolean
  enableColumnVisibility?: boolean
  enableGlobalSearch?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
}

// Status and role types for common use cases
export type CommonStatus = "active" | "inactive" | "pending" | "archived"
export type CommonRole = "admin" | "user" | "moderator" | "guest"

// Badge variant mapping
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

export interface BadgeConfig {
  [key: string]: BadgeVariant
}

// Common badge configurations
export const statusBadgeConfig: BadgeConfig = {
  active: "default",
  inactive: "secondary", 
  pending: "destructive",
  archived: "outline",
}

export const roleBadgeConfig: BadgeConfig = {
  admin: "destructive",
  moderator: "default",
  user: "secondary",
  guest: "outline",
}