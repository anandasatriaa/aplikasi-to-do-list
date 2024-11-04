<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\File;

class TodoController extends Controller
{
    public function index()
    {
        // Periksa apakah database `todos` kosong
        $todos = Todo::all();
        
        if ($todos->isEmpty()) {
            // Ambil data dari file JSON
            $json = File::get(storage_path('app/data.json'));
            $data = json_decode($json, true);

            // Simpan data JSON ke dalam database
            foreach ($data as $item) {
                Todo::create([
                    'description' => $item['description'],
                    'completed' => $item['completed']
                ]);
            }

            // Muat kembali dari database setelah disimpan
            $todos = Todo::all();
        }

        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $todo = Todo::create($request->all());
        return response()->json($todo, 201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update($request->all());
        return response()->json($todo);
    }

    public function destroy($id)
    {
        Todo::destroy($id);
        return response()->json(null, 204);
    }
}