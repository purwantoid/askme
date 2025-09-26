<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Concerns\CanApiResponse;

abstract class ApiController
{
    use CanApiResponse;
}
