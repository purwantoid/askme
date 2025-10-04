<?php

declare(strict_types=1);

namespace App\Packages\Teams;

use JsonSerializable;
use ReturnTypeWillChange;

class Role implements JsonSerializable
{
    /**
     * @param  string  $key  The key of the role.
     * @param  string  $name  The name of the role.
     * @param  array  $permissions  The permissions that are assigned to the role.
     * @param  string  $description  The description of the role.
     */
    public function __construct(
        public string $key,
        public string $name,
        public array $permissions,
        public string $description = ''
    ) {}

    /**
     * Describe the role.
     *
     * @return $this
     */
    public function description(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get the JSON serializable representation of the object.
     */
    #[ReturnTypeWillChange]
    public function jsonSerialize(): array
    {
        return [
            'key' => $this->key,
            'name' => __($this->name),
            'description' => __($this->description),
            'permissions' => $this->permissions,
        ];
    }
}
