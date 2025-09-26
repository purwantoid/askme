<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', static fn () => Inertia::render('welcome'));
Route::get('/chats', static fn () => Inertia::render('/chats'));
Route::get('/sign-in', static fn () => Inertia::render('auth/sign-in/index'));
Route::get('/sign-in-2', static fn () => Inertia::render('auth/sign-in/sign-in-2'));
Route::get('/sign-up', static fn () => Inertia::render('auth/sign-up/index'));
Route::get('/forgot-pass', static fn () => Inertia::render('auth/forgot-password/index'));
Route::get('/otp', static fn () => Inertia::render('auth/otp/index'));
Route::get('/401', static fn () => Inertia::render('errors/unauthorized-error'));
Route::get('/403', static fn () => Inertia::render('errors/forbidden'));
Route::get('/404', static fn () => Inertia::render('errors/not-found-error'));
Route::get('/500', static fn () => Inertia::render('errors/general-error'));
Route::get('/503', static fn () => Inertia::render('errors/maintenance-error'));
Route::get('/pricing', static fn () => Inertia::render('pricing/index'));

Route::group(['prefix' => '/dashboard', 'middleware' => ['auth', 'verified']], static function () {
    require __DIR__ . '/dashboard.php';
});

require __DIR__ . '/auth.php';
