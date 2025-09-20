<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $roles = Role::with('permissions')->paginate(500);
        return Inertia::render('roles/index', [
            'roles' => $roles,
        ]);
    }

    public function destroy(Role $role): \Illuminate\Http\RedirectResponse
    {
        $role->delete();
        return redirect()->route('roles.index')
            ->with('success', 'Role deleted successfully.');
    }

    public function permissions(): JsonResponse
    {
        $permissions = Permission::select(['id', 'name'])
            ->where('guard_name', '=', 'web')
            ->get();
        $permissions = $permissions
            ->groupBy(static fn($item) => Str::afterLast($item->name, ' '))
            ->map(function ($items) {
                return $items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'name' => Str::beforeLast($item->name, ' '),
                    ];
                })->sortBy('name')->values();
            });
        return response()->json($permissions);
    }

    public function storek(StoreRoleRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $role = Role::firstOrCreate([
                'name' => $validated['name'],
                'guard_name' => $validated['guard_name'] ?? 'web',
            ]);

            if (!empty($validated['permissions'])) {
                $role->syncPermissions($validated['permissions']);
            } else {
                $role->permissions()->detach();
            }

            return response()->json(['success' => true]);
        } catch (\Throwable $ex) {
            \Log::error($ex->getMessage());
            return response()->json([
                'success' => false,
            ]);
        }
    }
}
