<?php

declare(strict_types=1);

namespace App\Enums;

enum SocialiteDriver: string
{
    case Keycloak = 'keycloak';
    case Google = 'google';
}
