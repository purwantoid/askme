<?php

declare(strict_types=1);

namespace App\Contracts;

interface ValidatesTeamDeletion
{
    /**
     * Validate that the team can be deleted by the given user.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     */
    public function validate($user, mixed $team): void;
}