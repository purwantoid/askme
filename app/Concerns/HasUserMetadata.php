<?php

declare(strict_types=1);

namespace App\Concerns;

use App\Helpers\UserUtil;
use App\Models\User;
use Carbon\Carbon;

trait HasUserMetadata
{
    public static function bootUserMetadata(): void
    {
        static::creating(static function ($model) {
            if ($model->isFillable('creator')) {
                $model->creator = UserUtil::getCurrentUserId();
            }
            if ($model->isFillable('created_at')) {
                $model->created_at = Carbon::now();
            }
        });

        static::updating(static function ($model) {
            if ($model->isFillable('updator')) {
                $model->updator = UserUtil::getCurrentUserId();
            }
            if ($model->isFillable('updated_at')) {
                $model->updated_at = Carbon::now();
            }
        });
    }

    public function creator(): string
    {
        $creator = $this->belongsTo(User::class, 'creator', 'id');

        return $creator->first()?->name ?? 'System';
    }

    public function updator(): string
    {
        $updator = $this->belongsTo(User::class, 'updator', 'id');

        return $updator->first()?->name ?? 'System';
    }
}
