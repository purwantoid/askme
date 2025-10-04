<?php

declare(strict_types=1);

namespace App\Contracts;

interface DeletesTeams
{
    /**
     * Delete the given team.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     */
    public function delete($user, mixed $team): void;
}