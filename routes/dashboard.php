<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('dashboard/index'))->name('dashboard');

Route::group(['prefix' => '/settings'], function () {
    Route::get('/', fn () => Inertia::render('settings/profile/index'))->name('dashboard.contacts.index');
    Route::get('/account', fn () => Inertia::render('settings/account/index'))->name('dashboard.contacts.accoubt');
    Route::get('/appearance', fn () => Inertia::render('settings/appearance/index'))->name('dashboard.file-manager.index');
    Route::get('/display', fn () => Inertia::render('settings/display/index'))->name('dashboard.notes.index');
    Route::get('/notifications', fn () => Inertia::render('settings/notifications/index'))->name('dashboard.scrumboard.index');
    Route::get('/profile', fn () => Inertia::render('settings/profile/index'))->name('dashboard.todo.index');
});

Route::get('/apps', fn () => Inertia::render('apps/index'))->name('dashboard.apps');
Route::get('/chats', fn () => Inertia::render('chats/index'))->name('dashboard.chats');
Route::get('/charts', fn () => Inertia::render('charts/index'))->name('dashboard.charts');
Route::get('/mail', fn () => Inertia::render('mail/index'))->name('dashboard.mail');
Route::get('/orders', fn () => Inertia::render('ecommerce/orders'))->name('dashboard.ecommerce.orders');
Route::get('/products', fn () => Inertia::render('ecommerce/products'))->name('dashboard.ecommerce.products');
Route::get('/products/edit', fn () => Inertia::render('ecommerce/product'))->name('dashboard.ecommerce.products.edit');
Route::get('/tasks', fn () => Inertia::render('tasks/index'))->name('dashboard.tasks');
Route::get('/users', fn () => Inertia::render('users/index'))->name('dashboard.users');
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
Route::get('/help-center', fn () => Inertia::render('coming-soon/index'))->name('dashboard.coming-soon');
Route::get('/chat-ai', fn () => Inertia::render('playground/dashboard-03'))->name('dashboard.03');
