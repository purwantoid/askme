<?php

declare(strict_types=1);

namespace App\Services\SingleSignOn;

use App\Helpers\DateTimeUtil;
use App\Helpers\Log;
use App\Models\User;
use Illuminate\Support\Carbon;
use Spatie\Permission\Models\Role;

use function array_merge;

final class SingleSignOnService
{
    private const FACILITY = 'SINGLE_SIGN_ON_SERVICE';

    public function createOrUpdateUserWithAssignRole(SingleSignOnUser $keycloakUser): User
    {
        $userParams = [
            'email_verified_at' => $keycloakUser->isEmailVerified() ? DateTimeUtil::getCurrentTime() : null,
            'kc_user_id' => $keycloakUser->getId(),
            'kc_id_token' => $keycloakUser->getIdToken(),
            'kc_access_token' => $keycloakUser->getAccessToken(),
            'kc_refresh_token' => $keycloakUser->getRefreshToken(),
            'kc_access_token_expiration' => Carbon::now()->addSeconds($keycloakUser->getExpiredIn()),
            'kc_refresh_token_expiration' => Carbon::now()->addSeconds($keycloakUser->getRefreshExpiredIn()),
            'kc_session_id' => $keycloakUser->getSessionId(),
        ];

        $this->doAsyncRoleWithPermissions($keycloakUser);
        if ($findUser = User::where('email', $keycloakUser->getEmail())->first()) {
            $findUser->update($userParams);
            $findUser->refresh();
            $findUser->assignRole($keycloakUser->getRoles());

            return $findUser;
        }

        $newUser = User::create(array_merge([
            'name' => $keycloakUser->getName(),
            'email' => $keycloakUser->getEmail(),
            'password' => bcrypt(uniqid('', true)),
        ], $userParams));
        $newUser->assignRole($keycloakUser->getRoles());

        return $newUser;
    }

    private function doAsyncRoleWithPermissions(SingleSignOnUser $keycloakUser): void
    {
        Log::error(self::FACILITY, 'Do async role with permissions' . var_export($keycloakUser->getUserRaw(), true));
        foreach ($keycloakUser->getRoles() as $roleName) {
            Role::firstOrCreate([
                'name' => $roleName,
                'guard_name' => 'web',
                'team_id' => 0,
            ]);
        }
    }
}
