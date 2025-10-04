<?php

declare(strict_types=1);

namespace App\Packages\Teams\Actions;

use App\Contracts\CreatesTeams;
use App\Events\AddingTeam;
use App\Packages\Teams\Teams;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class CreateTeam implements CreatesTeams
{
    /**
     * Validate and create a new team for the given user.
     *
     * @param  \App\Models\User  $user
     * @param  array<string, string>  $input
     */
    public function create($user, array $input): mixed
    {
        Gate::forUser($user)->authorize('create', Teams::newTeamModel());

        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'personal_team' => ['boolean', function ($attribute, $value, $fail) use ($user): void {
                $hasPersonal = Teams::teamModel()::query()
                    ->where('personal_team', true)
                    ->where('user_id', $user->id)
                    ->exists();

                if ($value && $hasPersonal) {
                    $fail('You may not create a personal team.')->translate();
                }
            }],
        ])->validateWithBag('createTeam');

        AddingTeam::dispatch($user);

        $user->switchTeam($team = $user->ownedTeams()->create([
            'name' => $input['name'],
            'personal_team' => $input['personal_team'] ?? false,
        ]));

        return $team;
    }
}
