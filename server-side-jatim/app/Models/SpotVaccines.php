<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpotVaccines extends Model
{
    use HasFactory;
    protected $guarded =['id'];

    public function spots(){
        return $this->belongsTo(Spots::class);
    }


    public function vaccines(){
        return $this->belongsTo(Vaccines::class);
    }
}
