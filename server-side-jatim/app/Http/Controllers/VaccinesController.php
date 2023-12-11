<?php

namespace App\Http\Controllers;

use App\Models\Societies;
use App\Models\Vaccination;
use App\Models\Vaccines;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class VaccinesController extends Controller
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
            
            $societis = Societies::where('login_tokens', request('token'))->firstOrFail();
            $societisVaccination = Vaccination::where('societies_id', $societis->id)->get();
            $vaccines = array();

            foreach( $societisVaccination as $index => $s ){

                array_push($vaccines,[
                    $s->dose == 1 ? 'First' : 'Second' => [
                        'queue' => $s->dose == 1 ? 1 : 2,
                        'dose' => $s->dose,
                        'vaccination_date' => $s->date,
                        'spot' => $s->spots
                    ],
                    'status' => $s->status,
                    'vaccines' => $s->vaccines,
                    'vaccinator' => $s->medicals
                ]);

                $vaccines[$index][ $s->dose == 1 ? 'First' : 'Second' ]['spot']['regionals_id'] = $s->spots->regionals;

            }

            return response()->json([
                $vaccines
            ], 200);            

        } catch (Exception $error){
            return response()->json([
                'message' => 'Unathorized User'
            ], 401);
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
            $societis = Societies::where('login_tokens', request('token'))->firstOrFail();
            $societisVaccination = Vaccination::where('societies_id', $societis->id)->get();

            

            $v = Validator::make($request->all(), [
                'date' => 'required|date',
                'spots_id' => 'required',
            ]);

            
            // Consultations Check if accepted
            if( $societis->consultations->status !== 'accepted' ){
                return response()->json([
                    'message' => 'Your consultation must be accepted by doctor before'
                ], 401);
            }

            // Validation Check
            if ($v->fails()) {
                return response()->json([
                    'message' => $v->messages()
                ], 401);
            }
            
            // Check 2x vaccination
            if( $societisVaccination->count() >= 2 ){
                return response()->json([
                    'message' => 'Society has been 2x vaccinated'
                ], 401);
            }

            // return response()->json($societisVaccination->count(),200);

            $data = [
                'dose' => $societisVaccination->count() >= 1 ? 2 : 1,
                'date' => $request->date,
                'societies_id' => $societis->id,
                'spots_id' => $request->spots_id,
                'vaccines_id' => 1,
                'doctor_id' => 1,
            ];
            $msg = $data['dose'] == 1 ? 'First' : 'Second' ;
            Vaccination::create($data);

            return response()->json([
                'message' => $msg .= ' vaccination registered succesfuly'
            ], 200);

        } catch (Exception $error) {
            return response()->json([
                'message' => 'Unathorized User'
            ], 401);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vaccines  $vaccines
     * @return \Illuminate\Http\Response
     */
    public function show(Vaccines $vaccines)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Vaccines  $vaccines
     * @return \Illuminate\Http\Response
     */
    public function edit(Vaccines $vaccines)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vaccines  $vaccines
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vaccines $vaccines)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vaccines  $vaccines
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vaccines $vaccines)
    {
        //
    }
}
