<?php

namespace App\Http\Controllers;

use App\Models\Societies;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        
        $societis = Societies::where('id_card_number', $request->id_card_number)->first();
        
        if( $societis == NULL ){
            return response()->json([
                "message" => "ID card number or Password inccorect"
            ], 401);
        }
        

        if (Hash::check($request->password, $societis->password)) {
            $societis->login_tokens = md5($societis->id_card_number);
            $societis->save();

            return response()->json([
                "name" => $societis->name,
                "born_date" => $societis->born_date,
                "gender" => $societis->gender,
                "address" => $societis->address,
                "token" => $societis->login_tokens,
                "regional" => [
                    "id" => $societis->regionals->id,
                    "province" => $societis->regionals->province,
                    "district" => $societis->regionals->district,
                ]
            ], 200);
        }
        return response()->json([
            "message" => "ID card number or Password inccorect"
        ], 401);
    }

    public function logout(Request $request){

        try {

            $societis = Societies::where('login_tokens',request('token'))->firstOrFail();
            $societis->login_tokens = NULL;
            $societis->save();

            return response()->json([
                "message" => "Logout success"
            ],200);
            
        } catch(Exception $error ){

            return response()->json([
                "message" => "Invalid token"
            ],401);
        }

    }

    public function me(){

            $societis = Societies::where('login_tokens',request('token'))->firstOrFail();        
            $societis['regionals'] = $societis->regionals;
            
            return response()->json([
                $societis
            ],200);

    }



}
