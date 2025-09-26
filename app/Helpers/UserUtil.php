<?php

declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Support\Facades\Auth;

final class UserUtil
{
    public static function getCurrentUserId(int $defaultUserId = -7): int
    {
        return Auth::check() ? Auth::id() : $defaultUserId;
    }
}
