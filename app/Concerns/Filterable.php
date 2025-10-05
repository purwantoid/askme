<?php

declare(strict_types=1);

namespace App\Concerns;

use App\Contracts\AbstractFilter;
use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    public function scopeFilter(Builder $builder, AbstractFilter $filters): Builder
    {
        return $filters->apply($builder);
    }
}
