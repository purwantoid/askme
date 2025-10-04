<?php

declare(strict_types=1);

namespace App\Contracts;

interface UpdatesTeamMemberRoles
{
    /**
     * Update the role for the given team member.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  int  $teamMemberId
     */
    public function update($user, mixed $team, $teamMemberId, string $role): void;
}