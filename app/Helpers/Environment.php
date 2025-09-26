<?php

declare(strict_types=1);

namespace App\Helpers;

use App\Enums\Environment as EnvEnum;

final class Environment
{
    public static function isLocal(): bool
    {
        return config('app.env') === EnvEnum::Local->value;
    }

    public static function isStagging(): bool
    {
        return config('app.env') === EnvEnum::Staging->value;
    }

    public static function isProd(): bool
    {
        return config('app.env') === EnvEnum::Production->value;
    }
}
