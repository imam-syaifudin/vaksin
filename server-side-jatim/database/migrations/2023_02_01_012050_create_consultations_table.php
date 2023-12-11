<?php

use App\Models\Medicals;
use App\Models\Societies;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->foreignIdFor(Societies::class);
            $table->foreignIdFor(Medicals::class);
            $table->enum('status',['accepted','declined','pending']);
            $table->text('disease_history');
            $table->text('current_symptoms');
            $table->text('doctor_notes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('consultations');
    }
};
