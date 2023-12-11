<?php

namespace App\Http\Controllers;

use App\Models\Societies;
use App\Models\Spots;
use App\Models\SpotVaccines;
use Exception;
use Illuminate\Http\Request;

class SpotsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $bool = [true,false];

        try {
            $societis = Societies::where('login_tokens',request('token'))->firstOrFail();
            $spots = Spots::where('regionals_id',$societis->regionals_id)->get();
            foreach( $spots as $sp ){
                $sp['available_vaccines'] = [
                    "Sinovac"=> true,
                    "AstraZeneca"=> false,
                    "Moderna"=> true,
                    "Pfizer"=> true,
                    "Sinnopharm"=> false 
                ];
            }


            return response()->json([
                $spots
            ],200);
            
        } catch( Exception $error){
            return response()->json([
                "message" => "Unathorized User"
            ],401);
        }
    }
    
    public function detailSpot($id){


        try {
            $societis = Societies::where('login_tokens',request('token'))->firstOrFail();
            $date = '';

            if( request('date') !== null ){
                $date = request('date');
            } else {
                $date = date('Y-m-d');
            }

            $detailSpots = SpotVaccines::where('spots_id',$id)->where('date',$date)->get();

            
            $data = [];

            foreach( $detailSpots as $detail ){
                array_push($data,[
                    'date' => $detail->date,
                    'spot' => $detail->spots,
                    'name' => $detail->vaccines->name,
                ]);
            }

            $data['vaccination_count'] = $detailSpots->count();
            

            return response()->json($data,200);
            
            
            
        } catch(Exception $error){
            
            return response()->json([
                'message' => 'Unathorized User'
            ],401);
        }


    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Spots  $spots
     * @return \Illuminate\Http\Response
     */
    public function show(Spots $spots)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Spots  $spots
     * @return \Illuminate\Http\Response
     */
    public function edit(Spots $spots)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Spots  $spots
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Spots $spots)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Spots  $spots
     * @return \Illuminate\Http\Response
     */
    public function destroy(Spots $spots)
    {
        //
    }
}
