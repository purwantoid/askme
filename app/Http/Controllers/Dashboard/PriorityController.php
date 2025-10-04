<?php

declare(strict_types=1);

namespace App\Http\Controllers\Dashboard;

use App\Helpers\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Priority\PriorityRequest;
use App\Http\Resources\PriorityResource;
use App\Models\Priority;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class PriorityController extends Controller
{
    private const FACILITY = 'PRIORITY_CONTROLLER';

    public function index(Request $request): Response|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        if ($request->wantsJson()) {
            $query = Priority::with(['creator', 'updator']);
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
            $priorities = $query->paginate($perPage)->appends($request->query());

            return PriorityResource::collection($priorities);
        }

        return Inertia::render('administration/priority/index');
    }

    public function store(PriorityRequest $request): JsonResponse
    {
        try {
            $validated = $request->validated();
            $priority = Priority::query()->where('name', $validated['name'])->first();
            if (!$priority) {
                Priority::query()->create([
                    'name' => $validated['name'],
                    'value' => (float) ($validated['value'] ?? 0.00),
                    'status' => $validated['status'],
                ]);
            } else {
                Priority::query()->update([
                    'name' => $validated['name'],
                    'value' => (float) ($validated['value'] ?? 0.00),
                    'status' => $validated['status'],
                ]);
            }

            return response()->json(['success' => true]);
        } catch (Throwable $ex) {
            Log::error(self::FACILITY, 'Failed to save priority', $ex->getMessage());

            return response()->json([
                'success' => false,
            ]);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $priority = Priority::query()->findOrFail($id);
            $priority->delete();

            return response()->json(['success' => true]);
        } catch (Throwable $ex) {
            Log::error(self::FACILITY, 'Failed to delete priority', $ex->getMessage());

            return response()->json([
                'success' => false,
            ]);
        }
    }
}
