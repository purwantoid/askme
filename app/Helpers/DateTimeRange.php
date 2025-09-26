<?php

declare(strict_types=1);

namespace App\Helpers;

use DateInterval;
use DateTimeImmutable;
use Stringable;

final class DateTimeRange implements Stringable
{
    private ?DateTimeImmutable $startDateTime = null;

    private ?DateTimeImmutable $endDateTime = null;

    private string $toStringDateTimeFormat = 'd.m.Y';

    public function __construct(DateTimeImmutable $startDate, DateTimeImmutable $endDate, bool $normalizeTimeToStartAndEndOfDay = true)
    {
        $this->startDateTime = clone $startDate;
        $this->endDateTime = clone $endDate;
        if ($normalizeTimeToStartAndEndOfDay) {
            $this->normalizeTimesToStartAndEndOfDays();
        }
    }

    public function __toString(): string
    {
        return $this->getStartDateTime()->format($this->toStringDateTimeFormat) . ' to ' . $this->getEndDateTime()->format($this->toStringDateTimeFormat);
    }

    public static function fromStrings(string $startDate, string $endDate, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        return new self(MicroDateUtil::normalize($startDate), MicroDateUtil::normalize($endDate), $normalizeTimeToStartAndEndOfDay);
    }

    public static function fromDates(DateTimeImmutable $startDate, DateTimeImmutable $endDate, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        return new self($startDate, $endDate, $normalizeTimeToStartAndEndOfDay);
    }

    public static function fromStartDateAndInterval(DateTimeImmutable $startDate, DateInterval $interval, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        $endDate = (clone $startDate)->add($interval);
        if ($normalizeTimeToStartAndEndOfDay) { // If pass interval P1W or P1M one month or Week of full days is in the range
            $endDate->modify('-1 day');
        }

        return new self($startDate, $endDate, $normalizeTimeToStartAndEndOfDay);
    }

    public static function fromEndDateAndInterval(DateTimeImmutable $endDate, DateInterval $interval, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        $startDate = (clone $endDate)->sub($interval);
        if ($normalizeTimeToStartAndEndOfDay) { // If pass interval P1W or P1M one month or Week of full days is in the range
            $startDate->modify('+1 day');
        }

        return new self($startDate, $endDate, $normalizeTimeToStartAndEndOfDay);
    }

    public function getStartDateTime(): DateTimeImmutable
    {
        return clone $this->startDateTime;
    }

    public function getEndDateTime(): DateTimeImmutable
    {
        return clone $this->endDateTime;
    }

    public function setToStringDateTimeFormat(string $toStringDateTimeFormat): self
    {
        $this->toStringDateTimeFormat = $toStringDateTimeFormat;

        return $this;
    }

    public function getIntervalInDays(): int
    {
        return $this->startDateTime->diff($this->endDateTime)->days;
    }

    private function normalizeTimesToStartAndEndOfDays(): void
    {
        $this->startDateTime->modify('midnight');
        $this->endDateTime->modify('tomorrow midnight -1 millisecond');
    }
}
