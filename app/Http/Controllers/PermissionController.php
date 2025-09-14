<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::query()->paginate(10);

        return Inertia::render('permissions/Index', [
            'permissions' => $permissions,
        ]);
    }

    public function create()
    {
        return Inertia::render('permissions/Create');
    }

    public function store(StorePermissionRequest $request)
    {
        $validated = $request->validated();

        Permission::create(['name' => $validated['name']]);

        return redirect()->route('permissions.index')
            ->with('success', 'Permission created successfully.');
    }

    public function show(Permission $permission)
    {
        $permission->load('roles');

        return Inertia::render('permissions/Show', [
            'permission' => $permission,
        ]);
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('permissions/Edit', [
            'permission' => $permission,
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        $validated = $request->validated();

        $permission->update(['name' => $validated['name']]);

        return redirect()->route('permissions.index')
            ->with('success', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();

        return redirect()->route('permissions.index')
            ->with('success', 'Permission deleted successfully.');
    }
}
