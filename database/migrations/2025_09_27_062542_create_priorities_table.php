<?php

declare(strict_types=1);

use App\Enums\ItemStatus;
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
            $table->enum('status', ItemStatus::cases())->default(ItemStatus::Inactive->value);
            $table->bigInteger('created_by')->nullable(false);
            $table->bigInteger('updated_by')->nullable();
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
