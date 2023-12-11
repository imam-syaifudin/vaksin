<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultations extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function medicals(){
        return $this->belongsTo(Medicals::class);
    }

    public function societies(){
        return $this->belongsTo(Societies::class);
    }
}
