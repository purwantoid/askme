<?php

declare(strict_types=1);

namespace App\Contracts;

interface AcceptsTeamInvitations
{
    /**
     * Accept the given team invitation.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     */
    public function accept($user, mixed $invitation): void;
}
