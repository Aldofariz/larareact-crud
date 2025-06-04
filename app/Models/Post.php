<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //code data array
    use HasFactory;
    protected $fillable = [
        'title',
        'content',
        'picture'
    ];

}
