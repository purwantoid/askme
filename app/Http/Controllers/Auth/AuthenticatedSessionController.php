<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Enums\SocialiteDriver;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

final class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): RedirectResponse
    {
        return Socialite::driver(SocialiteDriver::Keycloak->value)->redirect();
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::user();
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        $logoutUrl = Socialite::driver(SocialiteDriver::Keycloak->value)
            ->getLogoutUrl(config('services.keycloak.redirect'), config('services.keycloak.client_id'), $user->getKcIdToken());

        return redirect()->away($logoutUrl);
    }
}
