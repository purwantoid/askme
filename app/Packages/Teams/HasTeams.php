<?php

declare(strict_types=1);

namespace App\Packages\Teams;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

trait HasTeams
{
    /**
     * Determine if the given team is the current team.
     */
    public function isCurrentTeam(mixed $team): bool
    {
        return $team->id === $this->currentTeam->id;
    }

    /**
     * Get the current team of the user's context.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function currentTeam(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        if (is_null($this->current_team_id) && $this->id) {
            $this->switchTeam($this->personalTeam());
        }

        return $this->belongsTo(Teams::teamModel(), 'current_team_id');
    }

    /**
     * Switch the user's context to the given team.
     */
    public function switchTeam(mixed $team): bool
    {
        if (!$team) {
            return false;
        }

        if (!$this->belongsToTeam($team)) {
            return false;
        }

        $this->forceFill([
            'current_team_id' => $team->id,
        ])->save();

        $this->setRelation('currentTeam', $team);

        return true;
    }

    /**
     * Get all of the teams the user owns or belongs to.
     *
     * @return \Illuminate\Support\Collection
     */
    public function allTeams()
    {
        return $this->ownedTeams->merge($this->teams)->sortBy('name');
    }

    /**
     * Get all of the teams the user owns.
     */
    public function ownedTeams(): HasMany
    {
        return $this->hasMany(Teams::teamModel());
    }

    /**
     * Get all of the teams the user belongs to.
     */
    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Teams::teamModel(), Teams::membershipModel())
            ->withPivot(['role', 'invited_by_id'])
            ->withTimestamps()
            ->as('membership');
    }

    /**
     * Get the user's "personal" team.
     *
     * @return \App\Models\Team
     */
    public function personalTeam()
    {
        return $this->ownedTeams->where('personal_team', true)->first();
    }

    /**
     * Determine if the user owns the given team.
     */
    public function ownsTeam(mixed $team): bool
    {
        if (is_null($team)) {
            return false;
        }

        return $this->id === $team->{$this->getForeignKey()};
    }

    /**
     * Determine if the user belongs to the given team.
     */
    public function belongsToTeam(mixed $team): bool
    {
        if (is_null($team)) {
            return false;
        }
        if ($this->ownsTeam($team)) {
            return true;
        }

        return (bool) $this->teams->contains(fn ($t) => $t->id === $team->id);
    }

    /**
     * Get the role that the user has on the team.
     */
    public function teamRole(mixed $team): ?Role
    {
        if ($this->ownsTeam($team)) {
            return new OwnerRole;
        }

        if (!$this->belongsToTeam($team)) {
            return null;
        }

        return $team->users
            ->where('id', $this->id)
            ->first()
            ->membership
            ->role;
    }

    /**
     * Determine if the user has the given role on the given team.
     */
    public function hasTeamRole(mixed $team, string $role): bool
    {
        if ($this->ownsTeam($team)) {
            return true;
        }

        return $this->belongsToTeam($team)
            && optional(
                $team->users
                    ->where('id', $this->id)
                    ->first()
                    ->membership
                    ->role
            )->key === $role;
    }

    /**
     * Get the user's permissions for the given team.
     */
    public function teamPermissions(mixed $team): array
    {
        if ($this->ownsTeam($team)) {
            return ['*'];
        }

        if (!$this->belongsToTeam($team)) {
            return [];
        }

        return (array) optional($this->teamRole($team))->permissions;
    }

    /**
     * Determine if the user has the given permission on the given team.
     */
    public function hasTeamPermission(mixed $team, string $permission): bool
    {
        if ($this->ownsTeam($team)) {
            return true;
        }

        if (!$this->belongsToTeam($team)) {
            return false;
        }

        return Permission::hasPermission($this->teamPermissions($team), $permission);
    }

    /**
     * Get the user's role on their current team.
     */
    public function currentTeamRole(): ?Role
    {
        if (!$this->currentTeam) {
            return null;
        }

        return $this->teamRole($this->currentTeam);
    }

    /**
     * Get the user's permissions on their current team.
     */
    public function currentTeamPermissions(): array
    {
        if (!$this->currentTeam) {
            return [];
        }

        return $this->teamPermissions($this->currentTeam);
    }

    /**
     * Determine if the user has the given permission on their current team.
     */
    public function hasCurrentTeamPermission(string $permission): bool
    {
        if (!$this->currentTeam) {
            return false;
        }

        return $this->hasTeamPermission($this->currentTeam, $permission);
    }
}
