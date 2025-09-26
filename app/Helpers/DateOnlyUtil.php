<?php

declare(strict_types=1);

namespace App\Helpers;

use DateTime;
use DateTimeImmutable;
use LogicException;

final class DateOnlyUtil
{
    public const EMPTY_DATE = '0000-00-00';

    public const FORMAT_MYSQL_DATE = 'Y-m-d';

    public const FORMAT_MYSQL_DATE_TIME = 'Y-m-d H:i:s';

    /**
     * @param  $value  string|DateTime
     */
    public static function normalize($value): DateTimeImmutable
    {
        if ($value === null) {
            throw new LogicException('Cannot normalize NULL date, string or DateTime expected');
        }
        $dateString = self::toString($value);

        return new DateTimeImmutable($dateString . ' 00:00:00Z');
    }

    /**
     * @param  $value  string|DateTime
     */
    public static function toString($value): string
    {
        if ($value === null) {
            throw new LogicException('Cannot convert NULL to string, string or DateTime expected');
        }
        $valueAsDate = $value instanceof DateTimeImmutable ? $value : new DateTimeImmutable((string) $value);

        return $valueAsDate->format(self::FORMAT_MYSQL_DATE);
    }

    public static function isValidDate($date, $format = 'Y-m-d'): bool
    {
        $d = DateTimeImmutable::createFromFormat($format, $date);

        return $d && $d->format($format) === $date;
    }
}
