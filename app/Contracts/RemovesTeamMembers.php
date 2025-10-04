<?php

declare(strict_types=1);

namespace App\Contracts;

interface RemovesTeamMembers
{
    /**
     * Remove the team member from the given team.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     */
    public function remove($user, mixed $team, mixed $teamMember): void;
}