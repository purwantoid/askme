<?php

declare(strict_types=1);

namespace App\Models;

use App\Concerns\HasUserMetadata;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;
use Illuminate\Database\Eloquent\SoftDeletes;

class Menu extends Model
{
    use HasUserMetadata;
    use SoftDeletes;

    protected $fillable = ['team_id', 'parent_id', 'group', 'title', 'url', 'icon', 'created_by', 'updated_by'];

    protected $table = 'menus';

    public function items(): Relations\HasMany
    {
        return $this->hasMany(self::class, 'parent_id');
    }
}
