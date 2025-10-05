<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render('administration/menu/index');
    }
}
