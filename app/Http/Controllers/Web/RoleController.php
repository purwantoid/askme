<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRoleRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Log;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Throwable;

final class RoleController extends Controller
{
    public function index(Request $request): \Inertia\Response|JsonResponse
    {
        if ($request->wantsJson()) {
            $query = Role::with('permissions');
            if ($request->filled('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->filled('sort')) {
                foreach (explode(',', $request->sort) as $sort) {
                    [$column, $direction] = array_pad(explode(':', $sort), 2, 'asc');
                    if (in_array($column, ['id', 'name', 'guard_name', 'created_at', 'updated_at'])) {
                        $query->orderBy($column, $direction);
                    }
                }
            } else {
                $query->orderBy('id', 'desc');
            }

            $perPage = $request->get('per_page', 5);
            $roles = $query->paginate($perPage)->appends($request->query());

            return response()->json($roles);
        }

        return Inertia::render('roles/index');
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $role = Role::findOrFail($id);
            $role->delete();

            return response()->json(['success' => true]);
        } catch (Throwable $ex) {
            Log::error($ex->getMessage());

            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function store(StoreRoleRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $role = Role::firstOrCreate([
                'team_id' => 0,
                'name' => $validated['name'],
                'guard_name' => $validated['guard_name'] ?? 'web',
            ]);

            if (!empty($validated['permissions'])) {
                $role->syncPermissions($validated['permissions']);
            } else {
                $role->permissions()->detach();
            }

            return response()->json(['success' => true]);
        } catch (Throwable $ex) {
            Log::error($ex->getMessage());

            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function permissions(): JsonResponse
    {
        $permissions = Permission::select(['id', 'name'])
            ->where('guard_name', '=', 'web')
            ->get();
        $permissions = $permissions
            ->groupBy(static fn ($item) => Str::afterLast($item->name, ' '))
            ->map(fn ($items) => $items->map(fn ($item): array => [
                'id' => $item->id,
                'name' => Str::beforeLast($item->name, ' '),
            ])->sortBy('name')->values());

        return response()->json($permissions);
    }
}
