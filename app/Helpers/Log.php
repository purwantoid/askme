<?php

declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Support\Facades\Log as LogFacade;
use Throwable;

final class Log
{
    public static function debug(string $facility, string $message): void
    {
        LogFacade::debug(self::format($facility, $message));
    }

    public static function info(string $facility, string $message): void
    {
        LogFacade::info(self::format($facility, $message));
    }

    public static function error(string $facility, string $message, $exception = null): void
    {
        $message = self::writeErr($message, $exception);
        LogFacade::error(self::format($facility, $message));
    }

    public static function warn(string $facility, string $message, $exception = null): void
    {
        $message = self::writeErr($message, $exception);
        LogFacade::warning(self::format($facility, $message));
    }

    private static function format(string $facility, string $message): string
    {
        return '[' . $facility . '] ' . $message;
    }

    private static function writeErr(string $message, $exception = null): string
    {
        if ($exception instanceof Throwable) {
            $message .= ' ' . $exception->getMessage();
        } elseif ($exception !== null) {
            $message .= " {$exception}";
        }

        return $message;
    }
}
