<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationsController;
use App\Http\Controllers\SpotsController;
use App\Http\Controllers\VaccinesController;
use App\Models\Vaccination;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });



// Auth Routes
route::post('v1/auth/login',[AuthController::class,'login']);
route::post('v1/auth/logout',[AuthController::class,'logout']);

route::get('v1/getuser',[AuthController::class,'me']);

route::post('v1/consultations',[ConsultationsController::class,'store']);
route::get('v1/consultations',[ConsultationsController::class,'index']);
route::get('v1/spots',[SpotsController::class,'index']);
route::get('v1/spots/{spot_id}',[SpotsController::class,'detailSpot']);
route::post('v1/vaccinations',[VaccinesController::class,'store']);
route::get('v1/vaccinations',[VaccinesController::class,'index']);







