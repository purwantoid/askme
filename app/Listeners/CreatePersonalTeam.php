<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Contracts\CreatesTeams;
use Illuminate\Auth\Events\Registered;

class CreatePersonalTeam
{
    public function __construct(
        protected CreatesTeams $createTeam
    ) {}

    public function handle(Registered $event): void
    {
        $this->createTeam->create($event->user, [
            'name' => explode(' ', $event->user->name, 2)[0] . "'s Team",
            'personal_team' => true,
        ]);
    }
}
