<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Social;
use App\Models\User;

class SocialPolicy
{

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
}