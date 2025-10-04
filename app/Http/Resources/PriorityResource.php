<?php

declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PriorityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => (string) $this->id,
            'name' => $this->name,
            'value' => $this->value,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'creator' => $this->creator_name,
            'updater' => $this->updator_name,
            'updated_at' => $this->updated_at,
        ];
    }
}
