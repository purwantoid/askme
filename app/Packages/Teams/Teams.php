<?php

declare(strict_types=1);

namespace App\Packages\Teams;

use App\Contracts\AcceptsTeamInvitations;
use App\Contracts\AddsTeamMembers;
use App\Contracts\CreatesTeams;
use App\Contracts\DeclinesTeamInvitations;
use App\Contracts\DeletesTeams;
use App\Contracts\InvitesTeamMembers;
use App\Contracts\RemovesTeamMembers;
use App\Contracts\SendsTeamInvitations;
use App\Contracts\UpdatesTeamMemberRoles;
use App\Contracts\UpdatesTeamNames;
use App\Contracts\ValidatesTeamDeletion;

class Teams
{
    /**
     * The roles that are available to assign to users.
     *
     * @var array
     */
    public static $roles = [];

    /**
     * The permissions that exist within the application.
     *
     * @var array
     */
    public static $permissions = [];

    /**
     * The user model that should be used by Teams.
     *
     * @var string
     */
    public static $userModel = \App\Models\User::class;

    /**
     * The team model that should be used by Teams.
     *
     * @var string
     */
    public static $teamModel = \App\Models\Team::class;

    /**
     * The membership model that should be used by Teams.
     *
     * @var string
     */
    public static $membershipModel = \App\Models\Membership::class;

    /**
     * The team invitation model that should be used by Teams.
     *
     * @var string
     */
    public static $teamInvitationModel = \App\Models\TeamInvitation::class;

    /**
     * The number of days team invitations are valid for.
     */
    public static ?int $invitationDuration = 7;

    /**
     * Determine if Teams has registered roles.
     *
     * @return bool
     */
    public static function hasRoles()
    {
        return count(static::$roles) > 0;
    }

    /**
     * Get all available roles.
     *
     * @return array
     */
    public static function getRoles()
    {
        return static::$roles;
    }

    /**
     * Find the role with the given key.
     */
    public static function findRole(string $key): ?Role
    {
        return static::$roles[$key] ?? null;
    }

    /**
     * Define a role.
     */
    public static function role(string $key, string $name, array $permissions): Role
    {
        static::$permissions = collect(array_merge(static::$permissions, $permissions))
            ->unique()
            ->sort()
            ->values()
            ->all();

        return tap(new Role($key, $name, $permissions), static function ($role) use ($key): void {
            static::$roles[$key] = $role;
        });
    }

    /**
     * Determine if any permissions have been registered.
     *
     * @return bool
     */
    public static function hasPermissions(): bool
    {
        return count(static::$permissions) > 0;
    }

    /**
     * Return the permissions in the given list that are actually defined permissions for the application.
     *
     * @return array
     */
    public static function validPermissions(array $permissions): array
    {
        return array_values(array_intersect($permissions, static::$permissions));
    }

    /**
     * Determine if a given user model utilizes the "HasTeams" trait.
     *
     * @param  \Illuminate\Database\Eloquent\Model
     * @return bool
     */
    public static function userHasTeamFeatures(\Illuminate\Database\Eloquent\Model $user): bool
    {
        return array_key_exists(HasTeams::class, class_uses_recursive($user)) ||
            method_exists($user, 'currentTeam');
    }

    /**
     * Find a user instance by the given ID.
     *
     * @param  int  $id
     * @return mixed
     */
    public static function findUserByIdOrFail($id)
    {
        return static::newUserModel()->where('id', $id)->firstOrFail();
    }

    /**
     * Find a user instance by the given email address or fail.
     *
     * @return mixed
     */
    public static function findUserByEmailOrFail(string $email)
    {
        return static::newUserModel()->where('email', $email)->firstOrFail();
    }

    /**
     * Get the name of the user model used by the application.
     *
     * @return string
     */
    public static function userModel()
    {
        return static::$userModel;
    }

    /**
     * Get a new instance of the user model.
     *
     * @return mixed
     */
    public static function newUserModel()
    {
        $model = static::userModel();

        return new $model;
    }

    /**
     * Specify the user model that should be used by Teams.
     */
    public static function useUserModel(string $model): void
    {
        static::$userModel = $model;
    }

    /**
     * Get the name of the team model used by the application.
     *
     * @return string
     */
    public static function teamModel()
    {
        return static::$teamModel;
    }

    /**
     * Get a new instance of the team model.
     *
     * @return mixed
     */
    public static function newTeamModel()
    {
        $model = static::teamModel();

        return new $model;
    }

    /**
     * Specify the team model that should be used by Teams.
     */
    public static function useTeamModel(string $model): void
    {
        static::$teamModel = $model;
    }

    /**
     * Get the name of the membership model used by the application.
     *
     * @return string
     */
    public static function membershipModel()
    {
        return static::$membershipModel;
    }

    /**
     * Specify the membership model that should be used by Teams.
     */
    public static function useMembershipModel(string $model): void
    {
        static::$membershipModel = $model;
    }

    /**
     * Get the name of the team invitation model used by the application.
     *
     * @return string
     */
    public static function teamInvitationModel()
    {
        return static::$teamInvitationModel;
    }

    /**
     * Specify the team invitation model that should be used by Teams.
     */
    public static function useTeamInvitationModel(string $model): void
    {
        static::$teamInvitationModel = $model;
    }

    /**
     * Register a class / callback that should be used to create teams.
     */
    public static function createTeamsUsing(string $class): void
    {
        app()->singleton(CreatesTeams::class, $class);
    }

    /**
     * Register a class / callback that should be used to update team names.
     */
    public static function updateTeamNamesUsing(string $class): void
    {
        app()->singleton(UpdatesTeamNames::class, $class);
    }

    /**
     * Register a class / callback that should be used to add team members.
     */
    public static function addTeamMembersUsing(string $class): void
    {
        app()->singleton(AddsTeamMembers::class, $class);
    }

    /**
     * Register a class / callback that should be used to invite team members.
     */
    public static function inviteTeamMembersUsing(string $class): void
    {
        app()->singleton(InvitesTeamMembers::class, $class);
    }

    /**
     * Register a class / callback that should be used to send team invitations.
     */
    public static function sendTeamInvitationsUsing(string $class): void
    {
        app()->singleton(SendsTeamInvitations::class, $class);
    }

    /**
     * Register a class / callback that should be used to accept team invitations.
     */
    public static function acceptTeamInvitationsUsing(string $class): void
    {
        app()->singleton(AcceptsTeamInvitations::class, $class);
    }

    /**
     * Register a class / callback that should be used to decline team invitations.
     */
    public static function declineTeamInvitationsUsing(string $class): void
    {
        app()->singleton(DeclinesTeamInvitations::class, $class);
    }

    /**
     * Register a class / callback that should be used to update team member roles.
     */
    public static function updateTeamMemberRolesUsing(string $class): void
    {
        app()->singleton(UpdatesTeamMemberRoles::class, $class);
    }

    /**
     * Register a class / callback that should be used to validate team deletion.
     */
    public static function validateTeamDeletionUsing(string $class): void
    {
        app()->singleton(ValidatesTeamDeletion::class, $class);
    }

    /**
     * Register a class / callback that should be used to remove team members.
     */
    public static function removeTeamMembersUsing(string $class): void
    {
        app()->singleton(RemovesTeamMembers::class, $class);
    }

    /**
     * Register a class / callback that should be used to delete teams.
     */
    public static function deleteTeamsUsing(string $class): void
    {
        app()->singleton(DeletesTeams::class, $class);
    }

    /**
     * Get the number of days team invitations are valid for.
     *
     * @return int
     */
    public static function invitationDuration()
    {
        return static::$invitationDuration;
    }

    /**
     * Set the number of days team invitations are valid for.
     */
    public static function useInvitationDuration(?int $days): void
    {
        static::$invitationDuration = $days;
    }
}
