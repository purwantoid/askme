<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

final class UserAccessibilityService
{
    public function getAccessibleRoutes(?int $userId = null): array
    {
        $user = $userId !== null && $userId !== 0 ? \App\Models\User::find($userId) : Auth::user();

        if (! $user) {
            return [];
        }

        $userPermissions = $user->getAllPermissions()->pluck('name')->toArray();
        $routes = Route::getRoutes();
        $accessibleRoutes = [];

        foreach ($routes as $route) {
            $name = $route->getName();
            if (! $name) {
                continue;
            }
            if ($this->shouldSkipRoute($name)) {
                continue;
            }

            $requiredPermission = $this->getRequiredPermission($name);

            if ($requiredPermission === null || $requiredPermission === '' || $requiredPermission === '0' || in_array($requiredPermission, $userPermissions)) {
                $accessibleRoutes[] = [
                    'name' => $name,
                    'uri' => $route->uri(),
                    'methods' => $route->methods(),
                    'url' => url($route->uri()),
                    'required_permission' => $requiredPermission,
                ];
            }
        }

        return $accessibleRoutes;
    }

    public function getInaccessibleRoutes(?int $userId = null): array
    {
        $user = $userId !== null && $userId !== 0 ? \App\Models\User::find($userId) : Auth::user();

        if (! $user) {
            return [];
        }

        $userPermissions = $user->getAllPermissions()->pluck('name')->toArray();
        $routes = Route::getRoutes();
        $inaccessibleRoutes = [];

        foreach ($routes as $route) {
            $name = $route->getName();
            if (! $name) {
                continue;
            }
            if ($this->shouldSkipRoute($name)) {
                continue;
            }

            $requiredPermission = $this->getRequiredPermission($name);

            if ($requiredPermission && ! in_array($requiredPermission, $userPermissions)) {
                $inaccessibleRoutes[] = [
                    'name' => $name,
                    'uri' => $route->uri(),
                    'methods' => $route->methods(),
                    'url' => url($route->uri()),
                    'required_permission' => $requiredPermission,
                ];
            }
        }

        return $inaccessibleRoutes;
    }

    public function getUserNavigationMenu(?int $userId = null): array
    {
        $accessibleRoutes = $this->getAccessibleRoutes($userId);

        // Filter only main navigation routes
        $navigationRoutes = array_filter($accessibleRoutes, fn (array $route): bool => $this->isNavigationRoute($route['name']));

        return $this->groupNavigationRoutes($navigationRoutes);
    }

    private function shouldSkipRoute(string $name): bool
    {
        $skipPatterns = [
            'sanctum.',
            'verification.',
            'password.',
            'login',
            'logout',
            'register',
            'storage.',
            'boost.',
        ];

        foreach ($skipPatterns as $pattern) {
            if (str_starts_with($name, $pattern) || $name === trim($pattern, '.')) {
                return true;
            }
        }

        return false;
    }

    private function getRequiredPermission(string $routeName): string
    {
        $actionMap = [
            'index' => 'view',
            'show' => 'view',
            'create' => 'create',
            'store' => 'create',
            'edit' => 'edit',
            'update' => 'edit',
            'destroy' => 'delete',
        ];

        $parts = explode('.', $routeName);

        if (count($parts) >= 2) {
            $resource = $parts[0];
            $action = $parts[1];

            $permissionAction = $actionMap[$action] ?? $action;

            return "{$permissionAction} {$resource}";
        }

        return "access {$routeName}";
    }

    private function isNavigationRoute(string $routeName): bool
    {
        // Define which routes should appear in navigation
        $navigationPatterns = [
            'dashboard',
            'roles.index',
            'permissions.index',
            'profile.edit',
        ];

        foreach ($navigationPatterns as $pattern) {
            if (str_starts_with($routeName, $pattern) || $routeName === $pattern) {
                return true;
            }
        }

        return false;
    }

    private function groupNavigationRoutes(array $routes): array
    {
        $grouped = [];

        foreach ($routes as $route) {
            $parts = explode('.', (string) $route['name']);
            $section = $parts[0];

            if (! isset($grouped[$section])) {
                $grouped[$section] = [
                    'name' => ucfirst($section),
                    'routes' => [],
                ];
            }

            $grouped[$section]['routes'][] = $route;
        }

        return $grouped;
    }
}
