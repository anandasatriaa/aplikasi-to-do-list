<?php

namespace Database\Seeders;

use App\Models\Todo;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Todo::create(['description' => 'Belajar PHP']);
        Todo::create(['description' => 'Membaca buku Laravel']);
        Todo::create(['description' => 'Mengerjakan tugas kuliah']);
        Todo::create(['description' => 'Berolahraga', 'completed' => true]);
        Todo::create(['description' => 'Menonton film']);
    }
}
