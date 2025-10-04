<?php

declare(strict_types=1);

namespace App\Observers;

use App\Models\Team;
use App\Models\User;

class UserObserver
{
    public function created(User $user): void
    {
        $user->teams()->attach(
            $team = Team::create([
                'name' => strtok($user->name, ' ') . "'s Team",
                'owner_id' => $user->id,
            ])
        );

        $user->currentTeam()->associate($team)->save();

        setPermissionsTeamId($team->id);
        $user->assignRole('super-admin');
    }
}
