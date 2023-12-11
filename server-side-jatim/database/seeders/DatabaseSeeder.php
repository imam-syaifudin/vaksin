<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Medicals;
use App\Models\Regionals;
use App\Models\Societies;
use App\Models\Spots;
use App\Models\User;
use App\Models\Vaccination;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        
        Vaccination::create([
            'dose' => 3,
            'date' => '2023-04-20',
            'societies_id' => 1,
            'spots_id' => 1,
            'vaccines_id' => 1,
            'doctor_id' => 1,
            'officer_id' => 1,
        ]);


        User::create([
            'name' => 'ugans123',
            'password' => bcrypt('12345678'),
        ]);

        Regionals::create([
            'province' => 'DKI Jakarta',
            'district' => 'Central Jakarta',
        ]);

        Spots::create([
            'regionals_id' => 1,
            'name' => 'Spot 1',
            'Address' => 'Jalan spot 1',
            'serve' => 123,
            'capacity' => 300,
        ]);

        Medicals::create([
            'spots_id' => 1,
            'user_id' => 1,
            'role' => 'doctor',
            'name' => 'Muhammad Imam'
        ]);

        Societies::create([
            'id_card_number' => '11080231',
            'password' => bcrypt('12345678'),
            'name' => 'Siti Puspita',
            'born_date' => '1974-10-22',
            'gender' => 'female',
            'address' => 'Ki. Raya Setiabudhi No. 790',
            'regionals_id' => 1,
        ]);



    }
}
