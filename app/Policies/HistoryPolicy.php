<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\History;
use App\Models\User;

class HistoryPolicy
{

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, History $history): bool
    {
        return $user->checkPermissionTo('view History');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('create History');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, History $history): bool
    {
        return $user->checkPermissionTo('update History');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, History $history): bool
    {
        return $user->checkPermissionTo('delete History');
    }
}