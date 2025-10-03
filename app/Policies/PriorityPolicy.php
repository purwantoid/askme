<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Priority;
use App\Models\User;

class PriorityPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->checkPermissionTo('view-any Priority');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Priority $priority): bool
    {
        return $user->checkPermissionTo('view Priority');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('create Priority');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Priority $priority): bool
    {
        return $user->checkPermissionTo('update Priority');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Priority $priority): bool
    {
        return $user->checkPermissionTo('delete Priority');
    }

    /**
     * Determine whether the user can delete any models.
     */
    public function deleteAny(User $user): bool
    {
        return $user->checkPermissionTo('delete-any Priority');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Priority $priority): bool
    {
        return $user->checkPermissionTo('restore Priority');
    }

    /**
     * Determine whether the user can restore any models.
     */
    public function restoreAny(User $user): bool
    {
        return $user->checkPermissionTo('restore-any Priority');
    }

    /**
     * Determine whether the user can replicate the model.
     */
    public function replicate(User $user, Priority $priority): bool
    {
        return $user->checkPermissionTo('replicate Priority');
    }

    /**
     * Determine whether the user can reorder the models.
     */
    public function reorder(User $user): bool
    {
        return $user->checkPermissionTo('reorder Priority');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Priority $priority): bool
    {
        return $user->checkPermissionTo('force-delete Priority');
    }

    /**
     * Determine whether the user can permanently delete any models.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->checkPermissionTo('force-delete-any Priority');
    }
}