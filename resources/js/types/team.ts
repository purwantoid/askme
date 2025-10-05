export interface Team {
  id: number
  name: string
  owner_id: number
  [key: string]: unknown
}

export interface TeamMember {
  name: string
  email: string
  status: "joined" | "pending"
}
