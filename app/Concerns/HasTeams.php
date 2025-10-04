<?php

declare(strict_types=1);

namespace App\Concerns;

use App\Models\Team;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

trait HasTeams
{
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
