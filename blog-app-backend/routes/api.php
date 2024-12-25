<?php

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\TempImageController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('blogs',[BlogController::class, 'index']);
Route::post('blogs/create',[BlogController::class, 'store']);
Route::get('blogs/{id}',[BlogController::class, 'show']);
Route::put('blogs/{id}',[BlogController::class, 'update']);
Route::delete('blogs/{id}',[BlogController::class, 'destroy']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', function (Request $request) {
    return $request->user();
});


//Route::middleware('role:admin')->group(function () {
    //         Route::get('blogs', [BlogController::class, 'index']);
    //         Route::post('blogs/create', [BlogController::class, 'store']);
    //         Route::get('blogs/{id}', [BlogController::class, 'show']);
    //         Route::put('blogs/{id}', [BlogController::class, 'update']);
    //         Route::delete('blogs/{id}', [BlogController::class, 'destroy']);
    //     });
    //     Route::middleware('role:author')->get('/author-only', function () {
    //         return response()->json(['message' => 'Welcome, Author']);
    //     });



Route::post('save-temp-image',[TempImageController::class, 'store']);



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
