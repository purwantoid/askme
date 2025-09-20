<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\History;
use App\Models\User;

class HistoryPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->checkPermissionTo('view-any History');
    }

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

    /**
     * Determine whether the user can delete any models.
     */
    public function deleteAny(User $user): bool
    {
        return $user->checkPermissionTo('delete-any History');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, History $history): bool
    {
        return $user->checkPermissionTo('restore History');
    }

    /**
     * Determine whether the user can restore any models.
     */
    public function restoreAny(User $user): bool
    {
        return $user->checkPermissionTo('restore-any History');
    }

    /**
     * Determine whether the user can replicate the model.
     */
    public function replicate(User $user, History $history): bool
    {
        return $user->checkPermissionTo('replicate History');
    }

    /**
     * Determine whether the user can reorder the models.
     */
    public function reorder(User $user): bool
    {
        return $user->checkPermissionTo('reorder History');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, History $history): bool
    {
        return $user->checkPermissionTo('force-delete History');
    }

    /**
     * Determine whether the user can permanently delete any models.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->checkPermissionTo('force-delete-any History');
    }
}