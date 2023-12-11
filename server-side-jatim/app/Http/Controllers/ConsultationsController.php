<?php

namespace App\Http\Controllers;

use App\Models\Consultations;
use App\Models\Societies;
use Exception;
use Illuminate\Http\Request;

class ConsultationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        try {
            $societis = Societies::where('login_tokens',request('token'))->firstOrFail();
            $consultations = Consultations::where('societies_id',$societis->id)->get();

            $data = array();

            foreach( $consultations as $conn ){
                array_push($data,[
                    'id' => $conn->id,
                    'status' => $conn->status,
                    'disease_history' => $conn->disease_history,
                    'current_symptoms' => $conn->current_symptoms,
                    'doctor_notes' => $conn->doctor_notes,
                    'doctor' => $conn->medicals->name
                ]);
            }
            
            return response()->json([
                "consultations" => $data
            ],200);
            
        } catch( Exception $error){
            return response()->json([
                "message" => "Unathorized User"
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
        try {
            $societis = Societies::where('login_tokens',request('token'))->firstOrFail();

            Consultations::create([
                'societies_id' => $societis->id, 
                'medicals_id' => 1, 
                'status' => 'pending', 
                'disease_history' => $request->disease_history,
                'current_symptoms' => $request->current_symptoms,
                'doctor_notes' => 'oke',
            ]);

            return response()->json([
                "message" => "Request consultation sent successful"
            ],200);
            
        } catch( Exception $error){
            return response()->json([
                "message" => "Unathorized User"
            ],401);
        }



    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Consultations  $consultations
     * @return \Illuminate\Http\Response
     */
    public function show(Consultations $consultations)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Consultations  $consultations
     * @return \Illuminate\Http\Response
     */
    public function edit(Consultations $consultations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Consultations  $consultations
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Consultations $consultations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Consultations  $consultations
     * @return \Illuminate\Http\Response
     */
    public function destroy(Consultations $consultations)
    {
        //
    }
}
