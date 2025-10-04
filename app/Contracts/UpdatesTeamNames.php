<?php

declare(strict_types=1);

namespace App\Contracts;

interface UpdatesTeamNames
{
    /**
     * Validate and update the given team's name.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  array<string, string>  $input
     */
    public function update($user, mixed $team, array $input): void;
}