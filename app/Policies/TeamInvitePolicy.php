<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\TeamInvite;
use App\Models\User;

class TeamInvitePolicy
{

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, TeamInvite $teaminvite): bool
    {
        return $user->checkPermissionTo('view TeamInvite');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('create TeamInvite');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, TeamInvite $teaminvite): bool
    {
        return $user->checkPermissionTo('update TeamInvite');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, TeamInvite $teaminvite): bool
    {
        return $user->checkPermissionTo('delete TeamInvite');
    }
}