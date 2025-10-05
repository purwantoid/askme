<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasUserMetadata;
use App\Policies\PriorityPolicy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;

#[UsePolicy(PriorityPolicy::class)]
class Priority extends Model
{
    use HasFactory;
    use HasUserMetadata;
    use SoftDeletes;

    protected $fillable = ['name', 'value', 'status', 'created_by', 'updated_by'];

    protected $table = 'priorities';
}
