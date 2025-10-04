import type { Team } from '@/types/team';

export interface User {
    id: number;
    name: string;
    email: string;
    gravatar: string;
    email_verified_at: string;
    teams: Team[];
    current_team: Team;
    permissions: string[];
    [key: string]: unknown;
}
