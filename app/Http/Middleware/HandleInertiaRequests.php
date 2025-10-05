<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Http\Resources\AuthenticatedUserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? AuthenticatedUserResource::make($user->load(
                    'teams:id,name,owner_id',
                    'currentTeam:id,name,owner_id',
                )) : null,
            ],
            'menus' => [
                [
                    'title' => 'General',
                    'items' => [
                        [
                            'title' => 'Dashboard',
                            'url' => '/dashboard',
                            'icon' => 'IconLayoutDashboard',
                        ],
                    ],
                ],
                [
                    'title' => 'Administration',
                    'items' => [
                        [
                            'title' => 'Priority',
                            'url' => '/dashboard/priority',
                            'icon' => 'IconChecklist',
                        ],
                    ],
                ],
                [
                    'title' => 'Access Control',
                    'items' => [
                        [
                            'title' => 'Roles',
                            'url' => '/dashboard/roles',
                            'icon' => 'IconShieldCheck',
                        ],
                        [
                            'title' => 'Users',
                            'url' => '/dashboard/users',
                            'icon' => 'IconUsers',
                        ],
                    ],
                ],
            ],
            'csrf_token' => csrf_token(),
        ];
    }
}
