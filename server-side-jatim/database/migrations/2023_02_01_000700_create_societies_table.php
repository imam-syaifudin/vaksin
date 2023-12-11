<?php

use App\Models\Regionals;
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
        Schema::create('societies', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->char('id_card_number',8);
            $table->string('password');
            $table->string('name');
            $table->date('born_date');
            $table->enum('gender',['male','female']);
            $table->text('address');
            $table->foreignIdFor(Regionals::class);
            $table->text('login_tokens')->nullable();
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
        Schema::dropIfExists('societies');
    }
};
