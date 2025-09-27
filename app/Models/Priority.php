<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasUserMetadata;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Priority extends Model
{
    use HasFactory;
    use HasUserMetadata;
    use SoftDeletes;

    protected $fillable = ['name', 'value', 'enabled', 'creator', 'updator'];

    protected $table = 'priorities';
}
