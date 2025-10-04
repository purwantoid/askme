<?php

declare(strict_types=1);

namespace App\Packages\Teams\Actions;

use App\Contracts\AddsTeamMembers;
use App\Events\AddingTeamMember;
use App\Events\TeamMemberAdded;
use App\Packages\Teams\Role as TeamsRole;
use App\Packages\Teams\Teams;
use App\Rules\Role;
use Closure;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class AddTeamMember implements AddsTeamMembers
{
    /**
     * Add a new team member to the given team.
     */
    public function add($user, $team, string $email, TeamsRole|string|null $role = null): void
    {
        Gate::forUser($user)->authorize('addTeamMember', $team);

        $this->validate($team, $email, $role);

        $newTeamMember = Teams::findUserByEmailOrFail($email);

        AddingTeamMember::dispatch($team, $newTeamMember);

        $team->users()->attach(
            $newTeamMember, [
                'role' => $role,
                'invited_by_id' => $user->id,
            ]
        );

        TeamMemberAdded::dispatch($team, $newTeamMember);
    }

    /**
     * Validate the add member operation.
     */
    protected function validate($team, string $email, TeamsRole|string|null $role): void
    {
        $role = $role instanceof TeamsRole ? $role->key : $role;

        Validator::make([
            'email' => $email,
            'role' => $role,
        ], $this->rules(), [
            'email.exists' => __('We were unable to find a registered user with this email address.'),
        ])->after(
            $this->ensureUserIsNotAlreadyOnTeam($team, $email)
        )->validateWithBag('addTeamMember');
    }

    /**
     * Get the validation rules for adding a team member.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    protected function rules(): array
    {
        return array_filter([
            'email' => ['required', 'email', 'exists:users'],
            'role' => Teams::hasRoles()
                ? ['required', 'string', new Role()]
                : null,
        ]);
    }

    /**
     * Ensure that the user is not already on the team.
     */
    protected function ensureUserIsNotAlreadyOnTeam($team, string $email): Closure
    {
        return function ($validator) use ($team, $email): void {
            $validator->errors()->addIf(
                $team->hasUserWithEmail($email),
                'email',
                __('This user already belongs to the team.')
            );
        };
    }
}