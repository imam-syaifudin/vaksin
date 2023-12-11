<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Societies extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function regionals(){
        return $this->belongsTo(Regionals::class);
    }

    public function consultations(){
        return $this->hasOne(Consultations::class);
    }

}
