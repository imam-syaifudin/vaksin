<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PDO;

class Spots extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $hidden = ['created_at','updated_at','regionals_id'];


    public function vaccination(){
        return $this->hasMany(Vaccination::class);
    }

    public function spot_vaccination(){
        return $this->hasMany(SpotVaccines::class);
    }

    public function regionals(){
        return $this->belongsTo(Regionals::class);
    }
}
