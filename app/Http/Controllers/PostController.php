<?php

namespace App\Http\Controllers;
//import react

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    // method untuk panggil halaman dashboard tabel post
    public function index(): Response
    {
        return Inertia::render('/posts', [
            'posts' => Post::all(),
        ]);
    }
}
