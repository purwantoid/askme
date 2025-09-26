<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Enums\SocialiteDriver;
use App\Helpers\Log;
use App\Services\SingleSignOn\SingleSignOnService;
use App\Services\SingleSignOn\SingleSignOnUser;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

final readonly class AuthController
{
    private const FACILITY = 'AUTH_CONTROLLER';

    public function __construct(
        private SingleSignOnService $singleSignOnService
    ) {}

    public function callback(): RedirectResponse
    {
        try {
            $socialiteUser = Socialite::driver(SocialiteDriver::Keycloak->value)->user();
            $singleSignUser = SingleSignOnUser::build($socialiteUser);
            $user = $this->singleSignOnService->createOrUpdateUserWithAssignRole($singleSignUser);

            Auth::login($user);

            // Simpan session ID ke Redis supaya bisa dilacak untuk Single Logout
            $sid = $socialiteUser->id; // Bisa juga dari token JWT sid
            Redis::set($sid, Session::getId());

            return redirect()->intended('/dashboard');
        } catch (Throwable $ex) {
            Log::error(self::FACILITY, 'Something wrong happened when attempt to handle keycloak callback', $ex);

            return redirect()->route('login')->withErrors('Authentication failed.');
        }
    }

    public function redirect(): RedirectResponse
    {
        return Socialite::driver(SocialiteDriver::Keycloak->value)->redirect();
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $logoutToken = $request->input('logout_token');
            $decodedToken = JWT::decode($logoutToken, new Key(config('services.keycloak.public_key'), 'RS256'));

            $sid = $decodedToken->sid ?? null;
            if (!$sid) {
                return response()->json(['error' => 'Invalid logout token'], 400);
            }

            $sessionId = Redis::get($sid);
            if (!$sessionId) {
                return response()->json(['error' => 'Session not found'], 404);
            }

            Session::setId($sessionId);
            Session::invalidate();
            Redis::del($sid);

            return response()->json(['success' => true, 'session_id' => $sessionId]);
        } catch (Throwable $ex) {
            Log::error(self::FACILITY, 'Something wrong happened when attempt to logout from keycloak', $ex);

            return response()->json(['error' => $ex->getMessage()], 500);
        }
    }
}
