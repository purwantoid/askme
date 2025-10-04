<?php

declare(strict_types=1);

namespace App\Models;

use App\Observers\UserObserver;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

#[ObservedBy(UserObserver::class)]
final class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    use HasPermissions;
    use HasRoles;
    use Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'status',
        'password',
        'email_verified_at',
        'kc_user_id',
        'kc_id_token',
        'kc_access_token',
        'kc_refresh_token',
        'kc_access_token_expiration',
        'kc_refresh_token_expiration',
        'kc_session_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function gravatar(): Attribute
    {
        return Attribute::make(fn () => $this->avatar());
    }

    public function teams(): Relations\BelongsToMany
    {
        return $this->belongsToMany(Team::class)->withTimestamps();
    }

    public function currentTeam(): Relations\BelongsTo
    {
        return $this->belongsTo(Team::class, 'current_team_id');
    }

    public function ownedTeam(): Relations\HasOne
    {
        return $this->hasOne(Team::class, 'owner_id');
    }

    public function ownedTeams(): Relations\HasMany
    {
        return $this->hasMany(Team::class, 'owner_id');
    }

    public function latestOwnTeam(): Relations\HasOne
    {
        return $this->ownedTeams()->one()->latestOfMany();
    }

    protected function avatar($size = 200): string
    {
        return 'https://www.gravatar.com/avatar/' . md5(mb_strtolower(mb_trim($this->email))) . '?s=' . $size . '&d=mp';
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'kc_access_token_expiration' => 'datetime',
            'kc_refresh_token_expiration' => 'datetime',
        ];
    }
}
