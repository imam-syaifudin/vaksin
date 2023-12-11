<?php

use App\Models\Societies;
use App\Models\Spots;
use App\Models\Vaccines;
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
        Schema::create('vaccinations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->tinyInteger('dose');
            $table->date('date');
            $table->foreignIdFor(Societies::class);
            $table->foreignIdFor(Spots::class);
            $table->foreignIdFor(Vaccines::class);
            $table->integer('doctor_id')->unsigned();
            $table->integer('officer_id')->unsigned();
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
        Schema::dropIfExists('vaccinations');
    }
};
