<?php

declare(strict_types=1);

namespace App\Contracts;

interface SendsTeamInvitations
{
    /**
     * Send a team invitation.
     */
    public function send($invitation): void;
}