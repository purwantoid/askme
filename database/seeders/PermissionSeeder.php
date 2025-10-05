<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'team admin']);
        $memberRole = Role::firstOrCreate(['name' => 'team member']);

        $teamPermissions = [
            'update team',
            'delete team',
            'invite users to team',
            'remove users from team',
        ];

        $models = ['article', 'category'];
        $actions = ['create', 'update', 'delete'];

        $modelPermissions = collect($models)
            ->flatMap(fn ($model) => collect($actions)->map(fn ($action) => "$action $model"))
            ->values()
            ->all();

        $permissions = [...$teamPermissions, ...$modelPermissions];

        collect($permissions)->each(fn ($item) => Permission::firstOrCreate(['name' => $item]));

        $adminRole->givePermissionTo($permissions);

        $memberRole->givePermissionTo([
            'create article',
            'create category',
            'invite users to team',
        ]);
    }
}
