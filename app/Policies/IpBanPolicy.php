<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\IpBan;
use App\Models\User;

class IpBanPolicy
{

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, IpBan $ipban): bool
    {
        return $user->checkPermissionTo('view IpBan');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->checkPermissionTo('create IpBan');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, IpBan $ipban): bool
    {
        return $user->checkPermissionTo('update IpBan');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, IpBan $ipban): bool
    {
        return $user->checkPermissionTo('delete IpBan');
    }
}