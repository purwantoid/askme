<?php

declare(strict_types=1);

namespace App\Packages\Teams\Actions;

use App\Contracts\DeletesTeams;
use App\Contracts\ValidatesTeamDeletion;

class DeleteTeam implements DeletesTeams
{
    public function __construct(
        protected ValidatesTeamDeletion $validates
    ) {}

    /**
     * Delete the given team.
     */
    public function delete($user, $team): void
    {
        $this->validates->validate($user, $team);

        $team->purge();
    }
}
