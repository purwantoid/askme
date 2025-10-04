<?php

declare(strict_types=1);

namespace App\Packages\Teams\Actions;

use App\Contracts\SendsTeamInvitations;
use App\Mail\TeamInvitation;
use Illuminate\Support\Facades\Mail;

class SendTeamInvitation implements SendsTeamInvitations
{
    /**
     * Send a team invitation.
     */
    public function send($invitation): void
    {
        Mail::to($invitation->email)->send(new TeamInvitation($invitation));
    }
}