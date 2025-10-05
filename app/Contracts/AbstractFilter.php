<?php

declare(strict_types=1);

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class AbstractFilter
{
    public function __construct(protected Request $request) {}

    final public function apply(Builder $builder): Builder
    {
        foreach ($this->request->all() as $filter => $value) {
            if (!empty($value) && method_exists($this, $filter)) {
                $builder = $this->$filter($builder, $value);
            }
        }

        return $builder;
    }
}
