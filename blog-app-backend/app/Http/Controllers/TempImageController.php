<?php

namespace App\Http\Controllers;

use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
             'image' => 'required|image',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'please fix error',
                'errors' => $validator->errors(),
            ]);
        }

        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $imageName = time().'.'.$ext;

        $tempImage = new TempImage();
        $tempImage->name = $imageName;
        $tempImage->save();

        $image->move(public_path('uploads/temp'), $imageName);
        return response()->json([
            'status' => true,
            'message' => 'image uploaded succesfuly',
            'image' => $tempImage,
        ]);
    }
}
