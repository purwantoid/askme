<?php

declare(strict_types=1);

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            App\Http\Middleware\HandleInertiaRequests::class,
            Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            App\Http\Middleware\TeamPermission::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->respond(function ($response, Throwable $exception, Request $request) {
            $shouldRenderError = in_array((int) $response->getStatusCode(), [500, 503, 404, 403, 401], true);
            App\Helpers\Log::error('ERROR_HANDLER', "Something went wrong went access, url: {$request->url()}", $exception);
            if ($shouldRenderError) {
                $errorComponents = [
                    '401' => 'errors/unauthorized-error',
                    '403' => 'errors/forbidden',
                    '404' => 'errors/not-found-error',
                    '500' => 'errors/general-error',
                    '503' => 'errors/maintenance-error',
                ];
                $component = $errorComponents[$response->getStatusCode()] ?? 'errors/general-error';

                return Inertia::render($component, ['status' => $response->getStatusCode()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            }
            if ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })->create();
