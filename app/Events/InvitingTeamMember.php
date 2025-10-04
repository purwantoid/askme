<?php

declare(strict_types=1);

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;

class InvitingTeamMember
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(public mixed $team, public mixed $email, public mixed $role) {}
}