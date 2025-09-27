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
        Schema::create('priorities', static function (Blueprint $table) {
            $table->id();
            $table->string('name', 16)->unique();
            $table->float('value')->unique();
            $table->boolean('enabled')->default(true);
            $table->bigInteger('creator')->nullable(false);
            $table->bigInteger('updator')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('priorities');
    }
};
