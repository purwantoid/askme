<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Social;
use App\Models\User;

class SocialPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->checkPermissionTo('view-any Social');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Social $social): bool
    {
        return $user->checkPermissionTo('view Social');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('create Social');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Social $social): bool
    {
        return $user->checkPermissionTo('update Social');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Social $social): bool
    {
        return $user->checkPermissionTo('delete Social');
    }

    /**
     * Determine whether the user can delete any models.
     */
    public function deleteAny(User $user): bool
    {
        return $user->checkPermissionTo('delete-any Social');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Social $social): bool
    {
        return $user->checkPermissionTo('restore Social');
    }

    /**
     * Determine whether the user can restore any models.
     */
    public function restoreAny(User $user): bool
    {
        return $user->checkPermissionTo('restore-any Social');
    }

    /**
     * Determine whether the user can replicate the model.
     */
    public function replicate(User $user, Social $social): bool
    {
        return $user->checkPermissionTo('replicate Social');
    }

    /**
     * Determine whether the user can reorder the models.
     */
    public function reorder(User $user): bool
    {
        return $user->checkPermissionTo('reorder Social');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Social $social): bool
    {
        return $user->checkPermissionTo('force-delete Social');
    }

    /**
     * Determine whether the user can permanently delete any models.
     */
    public function forceDeleteAny(User $user): bool
    {
        return $user->checkPermissionTo('force-delete-any Social');
    }
}