<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();
        
        for ($i = 0; $i < 10; $i++) { // Buat 10 data dummy
            Blog::create([
                'title' => $faker->sentence, // Judul blog
                'shortDesc' => $faker->paragraph, // Short description
                'description' => $faker->text(1000), // Deskripsi panjang
                'author' => $faker->name, // Penulis
                // 'image' => $faker->imageUrl(640, 480, 'business', true), // Gambar dummy
            ]);
        }
    }
}
