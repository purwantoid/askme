<?php

declare(strict_types=1);

namespace App\Services\SingleSignOn;

use App\Helpers\Environment;
use SocialiteProviders\Keycloak\Provider;

class SingleSignOnProvider extends Provider
{
    public static function additionalConfigKeys(): array
    {
        return ['base_url', 'realms', 'public_base_url'];
    }

    public function getLogoutUrl(?string $redirectUri = null, ?string $clientId = null, ?string $idTokenHint = null, ...$additionalParameters): string
    {
        $logoutUrl = parent::getLogoutUrl($redirectUri, $clientId, $idTokenHint, ...$additionalParameters);
        if (Environment::isLocal()) {
            $publicBaseUrl = rtrim($this->getConfig('public_base_url'), '/');
            $baseUrl = rtrim($this->getConfig('base_url'), '/');
            $logoutUrl = \str_replace($baseUrl, $publicBaseUrl, $logoutUrl);
        }
        return $logoutUrl;
    }

    protected function getAuthUrl($state): string
    {
        if (Environment::isLocal()) {
            $publicBaseUrl = rtrim($this->getConfig('public_base_url'), '/');
            $baseUrl = rtrim($this->getConfig('base_url'), '/');
            return \str_replace($baseUrl, $publicBaseUrl, $this->buildAuthUrlFromBase($this->getBaseUrl() . '/protocol/openid-connect/auth', $state));
        }

        return parent::getAuthUrl($state);
    }
}