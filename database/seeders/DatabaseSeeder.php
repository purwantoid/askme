<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user= User::factory()->create([
            'name' => 'Test User',
            'email' => 'shadcn@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'), // password
        ]);
    }
}
