<?php

declare(strict_types=1);

namespace App\Packages\Teams\Actions;

use App\Contracts\DeclinesTeamInvitations;
use Illuminate\Validation\ValidationException;

class DeclineTeamInvitation implements DeclinesTeamInvitations
{
    /**
     * Decline the given team invitation.
     *
     * @param  \App\Models\User  $user
     */
    public function decline($user, $invitation): void
    {
        if ($user->email !== $invitation->email) {
            throw ValidationException::withMessages([
                'invitation' => [__('This invitation was sent to :email. Please sign in with that account or create one if you don\'t have it.', ['email' => $invitation->email])],
            ]);
        }

        $invitation->delete();
    }
}
