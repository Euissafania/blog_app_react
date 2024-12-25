<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model
{
    use HasFactory;

    protected $table = 'blogs';
    protected $with = ['category'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
