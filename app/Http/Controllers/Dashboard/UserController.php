<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Helpers\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Throwable;

final class UserController extends Controller
{
    private const FACILITY = 'USER_CONTROLLER';

    public function index(Request $request): \Inertia\Response|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        if ($request->wantsJson()) {
            $query = User::with('roles');
            if ($request->filled('name')) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }

            if ($request->filled('status')) {
                $statuses = explode(',', $request->status);
                $query->whereIn('status', $statuses);
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
            $users = $query->paginate($perPage)->appends($request->query());

            return UserResource::collection($users);
        }

        return Inertia::render('users/index');
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $email = $validated['email'];
            $user = User::where('email', $email)->first();
            if (!$user) {
                $user = User::create([
                    'email' => $email,
                    'name' => $validated['name'],
                    'status' => $validated['status'],
                    'password' => bcrypt(uniqid('', true)),
                ]);
            } else {
                $user->update([
                    'name' => $validated['name'],
                    'status' => $validated['status'],
                ]);
            }
            if (!empty($validated['roles'])) {
                $user->syncRoles($validated['roles']);
            } else {
                $user->roles()->detach();
            }

            return response()->json(['success' => true]);
        } catch (Throwable $ex) {
            Log::error(self::FACILITY, 'Failed to save user', $ex->getMessage());

            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function roles(): JsonResponse
    {
        $roles = Role::select(['id', 'name'])
            ->where('guard_name', '=', 'web')
            ->get();
        $roles = $roles->map(fn ($item): array => [
            'id' => (string) $item->id,
            'name' => $item->name,
        ]);

        return response()->json($roles);
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $user = User::findOrFail($id);
            $user->roles()->detach();
            $user->delete();

            return response()->json(['success' => true]);
        } catch (Throwable $ex) {
            Log::error(self::FACILITY, 'Failed to delete user', $ex->getMessage());

            return response()->json([
                'success' => false,
            ]);
        }
    }
}
