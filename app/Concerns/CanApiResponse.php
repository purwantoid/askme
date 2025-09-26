<?php

declare(strict_types=1);

namespace App\Concerns;

use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Symfony\Component\HttpFoundation\Response;

trait CanApiResponse
{
    protected function paginate(LengthAwarePaginator|Paginator $paginator, string $message): JsonResponse
    {
        return response()->json([
            'status' => true,
            'data' => $paginator->items(),
            'pagination' => [
                'total' => $paginator->total(),
                'count' => $paginator->count(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'total_pages' => $paginator->lastPage(),
            ],
        ], Response::HTTP_OK);
    }

    protected function unauthorized(string $message = 'Resource not accessible'): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], Response::HTTP_UNAUTHORIZED);
    }

    protected function created(string $message = 'success', array $data = []): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], Response::HTTP_CREATED);
    }

    protected function ok(string $message = 'success', array $data = []): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], Response::HTTP_OK);
    }

    protected function failed(string $message = 'Data not found'): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], Response::HTTP_NOT_ACCEPTABLE);
    }

    protected function bad(string $message = 'Request invalid', array $errors = []): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
    }

    protected function notFound(string $message = 'Data not found', array $errors = [], array $data = []): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'errors' => $errors,
            'data' => $data,
        ], Response::HTTP_NO_CONTENT);
    }

    protected function error(string $message = 'Failed'): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    protected function forbidden(string $message = 'Forbidden'): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
        ], Response::HTTP_FORBIDDEN);
    }
}
