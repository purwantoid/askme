<?php

declare(strict_types=1);

namespace App\Helpers;

use DateTimeImmutable;

use function is_string;

final class MicroDateUtil
{
    public static function addMicroSeconds(string|DateTimeImmutable $value, int $ms): DateTimeImmutable
    {
        $date = self::normalize($value);
        $date->modify("$ms microseconds");

        return $date;
    }

    public static function normalize(string|DateTimeImmutable $value): DateTimeImmutable
    {
        return new DateTimeImmutable(self::toString($value));
    }

    public static function toString(string|DateTimeImmutable $value): string
    {
        return (is_string($value) ? new DateTimeImmutable($value) : $value)->format('Y-m-d H:i:s.u');
    }

    public static function getDuration(DateTimeImmutable $startTime, ?DateTimeImmutable $endTime = null): float
    {
        $endTime ??= new DateTimeImmutable();

        return (float) ($endTime->format('U.u') - $startTime->format('U.u'));
    }
}
