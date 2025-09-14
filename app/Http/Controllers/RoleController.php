<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(): \Inertia\Response
    {
        $roles = Role::with('permissions')->paginate(10);
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
}
