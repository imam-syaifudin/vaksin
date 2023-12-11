<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaccination extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $hidden = ['regionals_id'];

    public function spots(){
        return $this->belongsTo(Spots::class);
    }

    public function vaccines(){
        return $this->belongsTo(Vaccines::class);
    }

    public function medicals(){
        return $this->belongsTo(Medicals::class,'doctor_id');
    }
}
