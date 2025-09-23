<?php

declare(strict_types=1);

namespace App\Helpers;

use App\Concerns\HasCheckResult;

class GenericCheckResult
{
    use HasCheckResult;

    protected mixed $data = null;

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