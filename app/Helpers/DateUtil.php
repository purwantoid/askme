<?php

declare(strict_types=1);

namespace App\Helpers;

final class DateUtil
{
    public const EMPTY_DATETIME = '0000-00-00 00:00:00';

    public static function formatDate(\DateTime $dateTime): string
    {
        return $dateTime->format('Y-m-d');
    }

    public static function formatDateTime(\DateTime $dateTime): string
    {
        return $dateTime->format('Y-m-d H:i:s');
    }

    /**
     * @param \DateTime $start
     * @param \DateTime $end
     * @return int
     */
    public static function calculateDurationDays(\DateTime $start, \DateTime $end): int
    {
        if ($start->getTimezone()->getName() !== $end->getTimezone()->getName()) {
            throw new \LogicException('Comparing dates with different timezones will result in errors: ' . $start->getTimezone()->getName() . ' ' . $end->getTimezone()->getName());
        }
        $sign = $start > $end ? -1 : 1;
        return $sign * $start->diff($end)->days;
    }

    /**
     * @param \DateTime $start
     * @param \DateTime $end
     * @return int
     */
    public static function calculateDurationMonths(\DateTime $start, \DateTime $end): int
    {
        if ($start->getTimezone()->getName() !== $end->getTimezone()->getName()) {
            throw new \LogicException('Comparing dates with different timezones will result in errors: ' . $start->getTimezone()->getName() . ' ' . $end->getTimezone()->getName());
        }
        return ((int)$end->format('Y') * 12 + (int)$end->format('n')) - ((int)$start->format('Y') * 12 + (int)$start->format('n'));
    }

    /**
     * @param \DateTime|null $date
     * @return \DateTime|null
     */
    public static function cloneOrNull(?\DateTime $date): ?\DateTime
    {
        return $date ? clone $date : null;
    }

    public static function toStringIndo($value): string
    {
        return (\is_string($value) ? new \DateTime($value) : $value)->format('d-m-Y H:i:s');
    }

    public static function addMonths($value, int $months): \DateTime
    {
        $date = self::normalize($value);
        $oldDay = (int)$date->format('j');
        $date->modify(($months < 0 ? $months : '+' . $months) . ' months');
        $newDay = (int)$date->format('j');
        if ($newDay === $oldDay) {
            return $date;
        }
        //in PHP, -1 month of 31st july returns 1st july (31 july => 31 june => overflow to 1st july), same for +1 month
        $date->modify('-' . $newDay . ' days');
        return $date;
    }

    /**
     * @param $value string|\DateTime
     * @return \DateTime
     */
    public static function normalize($value): \DateTime
    {
        return new \DateTime(DateUtil::toString($value));
    }

    /**
     * @param string|\DateTime $value
     * @return string
     */
    public static function toString($value): string
    {
        return (\is_string($value) ? new \DateTime($value) : $value)->format('Y-m-d H:i:s');
    }

    public static function addYears($value, int $years): \DateTime
    {
        $date = self::normalize($value);
        $oldDay = (int)$date->format('j');
        $date->modify(($years < 0 ? $years : '+' . $years) . ' years');
        $newDay = (int)$date->format('j');
        if ($newDay === $oldDay) {
            return $date;
        }
        //in PHP, -1 year of 29th feb of leap year returns 1st march (29th feb => 29th feb non-leap => overflow to 1st march), same for +1 year
        $date->modify('-' . $newDay . ' days');
        return $date;
    }
}