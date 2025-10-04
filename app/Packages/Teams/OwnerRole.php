<?php

declare(strict_types=1);

namespace App\Packages\Teams;

class OwnerRole extends Role
{
    public function __construct()
    {
        parent::__construct('owner', 'Owner', ['*']);
    }
}