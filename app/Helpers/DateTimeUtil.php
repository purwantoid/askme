<?php

declare(strict_types=1);

namespace App\Helpers;

use DateTimeZone;

final class DateTimeUtil
{
    public const EMPTY_DATE = '0000-00-00';
    public const EMPTY_DATETIME = '0000-00-00 00:00:00';

    private static ?\DateTime $fixedTime = null;

    public static function getCurrentTime(): ?\DateTime
    {
        if (empty(self::$fixedTime)) {
            $timezone = new DateTimeZone(config('app.timezone'));
            return new \DateTime(timezone: $timezone);
        }

        return clone(self::$fixedTime);
    }

    public static function setTestTime(\DateTime $fixedTime): void
    {
        self::$fixedTime = $fixedTime;
    }

    public static function unsetFixedTime(): void
    {
        self::$fixedTime = null;
    }

    public static function isNullDate(\DateTime|string|null $value): bool
    {
        return $value === null || $value === self::EMPTY_DATE || $value === self::EMPTY_DATETIME || $value === '';
    }
}