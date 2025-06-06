<?php

namespace App\Http\Controllers;
//import react

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    // method untuk panggil halaman dashboard tabel post
    public function index(): Response
    {
        return Inertia::render('posts', [
            'posts' => Post::all(),
        ]);
    }

    //method untuk kirim data ke database
    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'picture' => 'nullable|image|max:2048'
        ]);

        $data = $request->only(['title', 'content']);

        if($request->hasFile('picture')){
            $file = $request->file('picture');
            $filename = time() . '_' . $file->getClientOriginalName();
            // Store the file in the "public/uploads" directory
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['picture'] = '/storage/' . $path;
        }

        Post::create($data);

        return redirect()->route('posts.index')->with('success', 'Data berhasil disimpan');
    }
}
