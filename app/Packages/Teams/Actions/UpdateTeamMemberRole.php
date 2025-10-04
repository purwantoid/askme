<?php

declare(strict_types=1);

namespace App\Packages\Teams\Actions;

use App\Contracts\UpdatesTeamMemberRoles;
use App\Events\TeamMemberUpdated;
use App\Packages\Teams\Teams;
use App\Rules\Role;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class UpdateTeamMemberRole implements UpdatesTeamMemberRoles
{
    /**
     * Update the role for the given team member.
     */
    public function update($user, $team, $teamMemberId, string $role): void
    {
        Gate::forUser($user)->authorize('updateTeamMember', $team);

        Validator::make(['role' => $role], [
            'role' => ['required', 'string', new Role()],
        ])->validate();

        $team->users()->updateExistingPivot($teamMemberId, [
            'role' => $role,
        ]);

        TeamMemberUpdated::dispatch($team->fresh(), Teams::findUserByIdOrFail($teamMemberId));
    }
}