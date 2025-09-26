<?php

declare(strict_types=1);

namespace App\Helpers;

use DateTimeImmutable;
use DateTimeZone;

final class DateTimeUtil
{
    public const EMPTY_DATE = '0000-00-00';

    public const EMPTY_DATETIME = '0000-00-00 00:00:00';

    private static ?DateTimeImmutable $fixedTime = null;

    public static function getCurrentTime(): DateTimeImmutable
    {
        if (!self::$fixedTime instanceof DateTimeImmutable) {
            $timezone = new DateTimeZone(config('app.timezone'));

            return new DateTimeImmutable(timezone: $timezone);
        }

        return clone self::$fixedTime;
    }

    public static function setTestTime(DateTimeImmutable $fixedTime): void
    {
        self::$fixedTime = $fixedTime;
    }

    public static function unsetFixedTime(): void
    {
        self::$fixedTime = null;
    }

    public static function isNullDate(DateTimeImmutable|string|null $value): bool
    {
        return $value === null || $value === self::EMPTY_DATE || $value === self::EMPTY_DATETIME || $value === '';
    }
}
