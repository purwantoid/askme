<?php

declare(strict_types=1);

namespace App\Concerns;

use App\Helpers\UserUtil;
use App\Models\User;
use Carbon\Carbon;

trait HasUserMetadata
{
    public static function bootHasUserMetadata(): void
    {
        static::creating(static function ($model) {
            if ($model->isFillable('created_by')) {
                $model->created_by = UserUtil::getCurrentUserId();
            }
            if ($model->isFillable('created_at')) {
                $model->created_at = Carbon::now();
            }
        });

        static::updating(static function ($model) {
            if ($model->isFillable('updated_by')) {
                $model->updated_by = UserUtil::getCurrentUserId();
            }
            if ($model->isFillable('updated_at')) {
                $model->updated_at = Carbon::now();
            }
        });
    }

    public function creator(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function updator(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by', 'id');
    }

    public function getCreatorNameAttribute(): string
    {
        return $this->creator?->name ?? 'System';
    }

    public function getUpdatorNameAttribute(): string
    {
        return $this->updator?->name ?? '-';
    }
}
