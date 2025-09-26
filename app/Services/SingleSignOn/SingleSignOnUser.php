<?php

declare(strict_types=1);

namespace App\Services\SingleSignOn;

use Laravel\Socialite\Contracts\User;

final class SingleSignOnUser
{
    private string $id;

    private string $name;

    private string $email;

    private ?string $nickname = null;

    private ?string $avatar = null;

    private bool $emailVerified = false;

    private string $idToken;

    private string $accessToken;

    private ?string $refreshToken = null;

    private ?string $sessionId = null;

    private int $expiredIn = 0;

    private int $refreshExpiredIn = 0;

    private array $userRaw = [];

    public static function build(User $keycloakUser): self
    {
        $userRaw = $keycloakUser->getRaw() ?? [];
        $tokenDetail = $keycloakUser->accessTokenResponseBody ?? [];

        return (new self())
            ->setId($keycloakUser->getId())
            ->setName($keycloakUser->getName() ?? '')
            ->setEmail($keycloakUser->getEmail() ?? '')
            ->setNickname($keycloakUser->getNickname())
            ->setAvatar($keycloakUser->getAvatar())
            ->setUserRaw($userRaw)
            ->setEmailVerified((bool) ($userRaw['email_verified'] ?? 0))
            ->setIdToken($tokenDetail['id_token'] ?? '')
            ->setAccessToken($tokenDetail['access_token'] ?? '')
            ->setRefreshToken($tokenDetail['refresh_token'] ?? null)
            ->setSessionId($tokenDetail['session_state'] ?? null)
            ->setExpiredIn((int) ($tokenDetail['expires_in'] ?? 0))
            ->setRefreshExpiredIn((int) ($tokenDetail['refresh_expires_in'] ?? 0));
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getNickname(): ?string
    {
        return $this->nickname;
    }

    public function setNickname(?string $nickname): self
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function isEmailVerified(): bool
    {
        return $this->emailVerified;
    }

    public function setEmailVerified(bool $emailVerified): self
    {
        $this->emailVerified = $emailVerified;

        return $this;
    }

    public function getIdToken(): string
    {
        return $this->idToken;
    }

    public function setIdToken(string $idToken): self
    {
        $this->idToken = $idToken;

        return $this;
    }

    public function getAccessToken(): string
    {
        return $this->accessToken;
    }

    public function setAccessToken(string $accessToken): self
    {
        $this->accessToken = $accessToken;

        return $this;
    }

    public function getRefreshToken(): ?string
    {
        return $this->refreshToken;
    }

    public function setRefreshToken(?string $refreshToken): self
    {
        $this->refreshToken = $refreshToken;

        return $this;
    }

    public function getSessionId(): ?string
    {
        return $this->sessionId;
    }

    public function setSessionId(?string $sessionId): self
    {
        $this->sessionId = $sessionId;

        return $this;
    }

    public function getExpiredIn(): int
    {
        return $this->expiredIn;
    }

    public function setExpiredIn(int $expiredIn): self
    {
        $this->expiredIn = $expiredIn;

        return $this;
    }

    public function getRefreshExpiredIn(): int
    {
        return $this->refreshExpiredIn;
    }

    public function setRefreshExpiredIn(int $refreshExpiredIn): self
    {
        $this->refreshExpiredIn = $refreshExpiredIn;

        return $this;
    }

    public function getUserRaw(): array
    {
        return $this->userRaw;
    }

    public function setUserRaw(array $userRaw): self
    {
        $this->userRaw = $userRaw;

        return $this;
    }

    public function getRoles(): array
    {
        return $this->userRaw['resource_access'][config('services.keycloak.client_id')]['roles'] ?? [];
    }
}
