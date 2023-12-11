<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicals extends Model
{
    use HasFactory;
    protected $guarded = ['id'];
    protected $hidden = ['spots_id','user_id','created_at','updated_at'];


    public function user(){
        return $this->hasOne(User::class);
    }

    public function consultations(){
        return $this->hasMany(Consultations::class);
    }
}
