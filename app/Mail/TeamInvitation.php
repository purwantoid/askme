<?php

declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class TeamInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public \App\Packages\Teams\TeamInvitation $invitation) {}

    /**
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.team-invitation', [
            'acceptUrl' => URL::signedRoute('team-invitations.accept', [
                'invitation' => $this->invitation,
            ]),
            'invitedByName' => $this->invitation->invitedBy?->name,
        ])->subject(__('You\'re invited to join :team', ['team' => $this->invitation->team->name]));
    }
}
