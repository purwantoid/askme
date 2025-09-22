<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(): \Inertia\Response|JsonResponse
    {
        return Inertia::render('users/index');
    }

    public function store()
    {

    }

    public function destroy(string $id)
    {

    }
}
