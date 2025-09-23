<?php

declare(strict_types=1);

namespace App\Helpers;

final class DateTimeRange
{
    protected ?\DateTime $startDateTime = null;
    protected ?\DateTime $endDateTime = null;
    protected ?\DateInterval $interval = null;
    protected string $toStringDateTimeFormat = 'd.m.Y';

    public function __construct(\DateTime $startDate, \DateTime $endDate, bool $normalizeTimeToStartAndEndOfDay = true)
    {
        $this->startDateTime = clone $startDate;
        $this->endDateTime = clone $endDate;
        if ($normalizeTimeToStartAndEndOfDay) {
            $this->normalizeTimesToStartAndEndOfDays();
        }
    }

    private function normalizeTimesToStartAndEndOfDays(): void
    {
        $this->startDateTime->modify("midnight");
        $this->endDateTime->modify("tomorrow midnight -1 millisecond");
    }

    public static function fromStrings(string $startDate, string $endDate, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        return new self(MicroDateUtil::normalize($startDate), MicroDateUtil::normalize($endDate), $normalizeTimeToStartAndEndOfDay);
    }

    public static function fromDates(\DateTime $startDate, \DateTime $endDate, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        return new self($startDate, $endDate, $normalizeTimeToStartAndEndOfDay);
    }

    public static function fromStartDateAndInterval(\DateTime $startDate, \DateInterval $interval, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        $endDate = (clone $startDate)->add($interval);
        if ($normalizeTimeToStartAndEndOfDay) //If pass interval P1W or P1M one month or Week of full days is in the range
        {
            $endDate->modify("-1 day");
        }
        return new self($startDate, $endDate, $normalizeTimeToStartAndEndOfDay);
    }

    public static function fromEndDateAndInterval(\DateTime $endDate, \DateInterval $interval, bool $normalizeTimeToStartAndEndOfDay = true): self
    {
        $startDate = (clone $endDate)->sub($interval);
        if ($normalizeTimeToStartAndEndOfDay) //If pass interval P1W or P1M one month or Week of full days is in the range
        {
            $startDate->modify("+1 day");
        }
        return new self($startDate, $endDate, $normalizeTimeToStartAndEndOfDay);
    }

    public function __toString(): string
    {
        return $this->getStartDateTime()->format($this->toStringDateTimeFormat) . " to " . $this->getEndDateTime()->format($this->toStringDateTimeFormat);
    }

    public function getStartDateTime(): \DateTime
    {
        return clone $this->startDateTime;
    }

    public function getEndDateTime(): \DateTime
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
}