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

    public function store(StoreRoleRequest $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $role = Role::create(['name' => $validated['name']]);
        if (!empty($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return redirect()->route('roles.index')
            ->with('success', 'Role created successfully.');
    }

    public function create(): \Inertia\Response
    {
        $permissions = Permission::all();
        return Inertia::render('roles/create', [
            'permissions' => $permissions,
        ]);
    }

    public function show(Role $role): \Inertia\Response
    {
        $role->load('permissions', 'users');
        return Inertia::render('roles/show', [
            'role' => $role,
        ]);
    }

    public function edit(Role $role): \Inertia\Response
    {
        $permissions = Permission::all();
        $role->load('permissions');
        return Inertia::render('roles/edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    public function update(UpdateRoleRequest $request, Role $role): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validated();
        $role->update(['name' => $validated['name']]);
        if (isset($validated['permissions'])) {
            $role->syncPermissions($validated['permissions']);
        }

        return redirect()->route('roles.index')
            ->with('success', 'Role updated successfully.');
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
