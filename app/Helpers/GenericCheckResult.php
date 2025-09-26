<?php

declare(strict_types=1);

namespace App\Helpers;

use App\Concerns\HasCheckResult;

final class GenericCheckResult
{
    use HasCheckResult;

    private mixed $data = null;

    public function getData(): mixed
    {
        return $this->data;
    }

    public function setData(mixed $data): self
    {
        $this->data = $data;

        return $this;
    }
}
