<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teams', static function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->index();
            $table->string('name');
            $table->boolean('personal_team');
            $table->timestamps();
        });

        Schema::create('team_user', static function (Blueprint $table): void {
            $table->id();
            $table->foreignId('team_id');
            $table->foreignId('user_id');
            $table->string('role')->nullable()->index();
            $table->foreignId('invited_by_id')->nullable()->index();
            $table->timestamps();

            $table->unique(['team_id', 'user_id']);
        });

        Schema::create('team_invitations', static function (Blueprint $table): void {
            $table->id();
            $table->foreignId('team_id')->constrained()->cascadeOnDelete();
            $table->string('email');
            $table->string('role')->nullable();
            $table->timestamp('expires_at')->nullable()->index();
            $table->foreignId('invited_by_id')->nullable()->index();
            $table->timestamps();

            $table->unique(['team_id', 'email']);
        });

        Schema::table('users', static function (Blueprint $table): void {
            if (Schema::hasColumn('users', 'current_team_id')) {
                return;
            }

            $table->foreignId('current_team_id')
                ->nullable()
                ->index()
                ->after('remember_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
        Schema::dropIfExists('team_user');
        Schema::dropIfExists('team_invitations');
        Schema::table('users', static function (Blueprint $table): void {
            $table->dropForeign('users_current_team_id_foreign');
            $table->dropColumn('current_team_id');
        });
    }
};
