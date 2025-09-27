<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasUserMetadata;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;
    use HasUserMetadata;
    use SoftDeletes;

    protected $table = 'categories';

    protected $fillable = ['name', 'description', 'enabled', 'priority_id', 'creator', 'updator'];

    protected $hidden = ['pivot'];

    public function priority(): BelongsTo
    {
        return $this->belongsTo(Priority::class);
    }
}
