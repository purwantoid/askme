<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasRoles;
    use HasPermissions;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
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

    public function getKcUserId(): ?string
    {
        return $this->kc_user_id;
    }

    public function getKcIdToken(): ?string
    {
        return $this->kc_id_token;
    }

    public function getKcAccessToken(): ?string
    {
        return $this->kc_access_token;
    }

    public function getKcRefreshToken(): ?string
    {
        return $this->kc_refresh_token;
    }

    public function getKcExpiredId(): ?Carbon
    {
        return $this->kc_access_token_expiration;
    }

    public function getKcRefreshExpiredId(): ?Carbon
    {
        return $this->kc_refresh_token_expiration;
    }

    public function getKcSessionId(): ?string
    {
        return $this->kc_session_id;
    }
}
