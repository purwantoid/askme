<?php

declare(strict_types=1);

namespace App\Providers;

use App\Services\SingleSignOn\SingleSignOnProvider;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Event::listen(static function (\SocialiteProviders\Manager\SocialiteWasCalled $event): void {
            $event->extendSocialite('keycloak', SingleSignOnProvider::class);
        });
    }
}
