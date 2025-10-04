<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @property \App\Models\User $resource
 *
 * @mixin \App\Models\User
 */
class AuthenticatedUserResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email_verified_at' => $this->email_verified_at,
            'email' => $this->email,
            'gravatar' => $this->gravatar,
            'teams' => $this->teams->map(fn ($team) => [
                'id' => $team->id,
                'name' => $team->name,
                'owner_id' => $team->owner_id,
            ]),
            'current_team' => [
                'id' => $this->currentTeam?->id,
                'name' => $this->currentTeam?->name,
                'owner_id' => $this->currentTeam?->owner_id,
            ],

            'permissions' => [
                ...($this->can('leave', $this->currentTeam) ? ['leave current team'] : []),
                ...($this->can('update', $this->currentTeam) ? ['update current team'] : []),
                ...($this->can('delete', $this->currentTeam) ? ['delete current team'] : []),
                ...collect($this->getPermissionsViaRoles()->pluck('name'))->diff(['update team', 'delete team']),
            ],
        ];
    }
}
