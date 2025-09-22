<?php

declare(strict_types=1);

namespace App\Helpers;

final class MicroDateUtil
{
    public static function addMicroSeconds(string|\DateTime $value, int $ms): \DateTime
    {
        $date = self::normalize($value);
        $date->modify("$ms microseconds");
        return $date;
    }

    public static function normalize(string|\DateTime $value): \DateTime
    {
        return new \DateTime(self::toString($value));
    }

    public static function toString(string|\DateTime $value): string
    {
        return (\is_string($value) ? new \DateTime($value) : $value)->format('Y-m-d H:i:s.u');
    }

    public static function getDuration(\DateTime $startTime, \DateTime $endTime = null): float
    {
        $endTime = $endTime ?? (new \DateTime());
        return (float)($endTime->format('U.u') - $startTime->format('U.u'));
    }
}