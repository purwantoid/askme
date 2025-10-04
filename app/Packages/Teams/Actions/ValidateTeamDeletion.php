<?php

declare(strict_types=1);

namespace App\Packages\Teams\Actions;

use App\Contracts\ValidatesTeamDeletion;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\ValidationException;

class ValidateTeamDeletion implements ValidatesTeamDeletion
{
    /**
     * Validate that the team can be deleted by the given user.
     */
    public function validate($user, $team): void
    {
        Gate::forUser($user)->authorize('delete', $team);

        if ($team->personal_team) {
            throw ValidationException::withMessages([
                'team' => __('You may not delete your personal team.'),
            ])->errorBag('deleteTeam');
        }
    }
}
