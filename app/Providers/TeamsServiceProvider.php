<?php

declare(strict_types=1);

namespace App\Providers;

use App\Packages\Teams\Teams;
use Illuminate\Support\ServiceProvider;

class TeamsServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->registerActionBindings();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configurePermissions();

        // Teams::createTeamsUsing(CreateTeam::class);
    }

    /**
     * Register the action bindings for the package.
     */
    protected function registerActionBindings(): void
    {
        $this->app->singleton(\App\Contracts\CreatesTeams::class, \App\Packages\Teams\Actions\CreateTeam::class);
        $this->app->singleton(\App\Contracts\InvitesTeamMembers::class, \App\Packages\Teams\Actions\InviteTeamMember::class);
        $this->app->singleton(\App\Contracts\SendsTeamInvitations::class, \App\Packages\Teams\Actions\SendTeamInvitation::class);
        $this->app->singleton(\App\Contracts\AcceptsTeamInvitations::class, \App\Packages\Teams\Actions\AcceptTeamInvitation::class);
        $this->app->singleton(\App\Contracts\DeclinesTeamInvitations::class, \App\Packages\Teams\Actions\DeclineTeamInvitation::class);
        $this->app->singleton(\App\Contracts\AddsTeamMembers::class, \App\Packages\Teams\Actions\AddTeamMember::class);
        $this->app->singleton(\App\Contracts\RemovesTeamMembers::class, \App\Packages\Teams\Actions\RemoveTeamMember::class);
        $this->app->singleton(\App\Contracts\UpdatesTeamNames::class, \App\Packages\Teams\Actions\UpdateTeamName::class);
        $this->app->singleton(\App\Contracts\UpdatesTeamMemberRoles::class, \App\Packages\Teams\Actions\UpdateTeamMemberRole::class);
        $this->app->singleton(\App\Contracts\DeletesTeams::class, \App\Packages\Teams\Actions\DeleteTeam::class);
        $this->app->singleton(\App\Contracts\ValidatesTeamDeletion::class, \App\Packages\Teams\Actions\ValidateTeamDeletion::class);
    }

    /**
     * Configure the roles and permissions that are available within the application.
     */
    protected function configurePermissions(): void
    {
        Teams::role('admin', 'Administrator', [
            'team:create',
            'team:read',
            'team:update',
            'team:members:*',
            // 'api-keys:*',
        ])->description('Administrator users can perform any action.');

        Teams::role('member', 'Member', [
            'team:read',
            'team:members:read',
        ])->description('Member users can read teams and their members.');
    }
}
