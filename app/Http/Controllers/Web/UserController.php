<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

final class UserController extends Controller
{
    public function index(): \Inertia\Response|JsonResponse
    {
        return Inertia::render('users/index');
    }
}
