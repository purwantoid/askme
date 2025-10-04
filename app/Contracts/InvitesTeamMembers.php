<?php

declare(strict_types=1);

namespace App\Contracts;

interface InvitesTeamMembers
{
    /**
     * Invite a new team member to the given team.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     */
    public function invite($user, mixed $team, string $email, ?string $role = null);
}