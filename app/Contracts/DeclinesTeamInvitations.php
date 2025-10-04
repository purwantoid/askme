<?php

declare(strict_types=1);

namespace App\Contracts;

interface DeclinesTeamInvitations
{
    /**
     * Decline the given team invitation.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     */
    public function decline($user, mixed $invitation): void;
}