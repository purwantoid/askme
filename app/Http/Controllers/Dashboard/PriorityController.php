<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PriorityController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('administration/priority/index');
    }
}
