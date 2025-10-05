<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeamPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        if ($user?->currentTeam) {
            abort_unless($user->teams->contains($user->currentTeam), 403);
            setPermissionsTeamId($user->currentTeam->id);
        }

        return $next($request);
    }
}
