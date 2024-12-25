<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class BlogController extends Controller
{
    public function index(Request $request) {        

        $blogs = Blog::orderBy('created_at','DESC');

        if (!empty($request->keyword)) {
            $blogs = $blogs->where('title','like','%'.$request->keyword.'%');
        }

        $blogs = $blogs->get();

        return response()->json([
            'status' => true,
            'data' => $blogs
        ]);
    }

    public function show($id){
        $blog = Blog::find($id);
        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => "Blog Not Found",
            ]);
        }

        $blog['date'] = \Carbon\Carbon::parse($blog->created_at)->format('d M, Y');

        return response()->json([
            'status' => true,
            'data' => $blog,
        ]);
    }

    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:10',
            'author' => 'required|min:3',
            'description' => 'required|min:20',
            'shortDesc' => 'required|max:200',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Please fix the errors",
                'errors' => $validator->errors(),
            ]);
        }
    
        // Buat blog baru
        $blog = new Blog();
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description;
        $blog->shortDesc = $request->shortDesc;
        $blog->save();
    
        // Proses gambar jika ada image_id
        $tempImage = TempImage::find($request->image_id);
        if ($tempImage !== null) {
            $imageExtArray = explode('.', $tempImage->name);
            $ext = last($imageExtArray);
            $imageName = time() . '-' . $blog->id . '.' . $ext;
    
            $blog->image = $imageName;
            $blog->save();
    
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $desPath = public_path('uploads/blogs/' . $imageName);
    
            // Salin file dan hapus file sementara
            if (File::copy($sourcePath, $desPath)) {
                File::delete($sourcePath);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => "Failed to copy the image",
                ], 500);
            }
        }
    
        return response()->json([
            'status' => true,
            'message' => "Blog added successfully",
            'data' => $blog,
        ]);
    }    

    public function update(Request $request, $id){
       $blog =  Blog::find($id);

       if($blog == null) {
        return response()->json([
            'status' => false,
            'message' => "Blog Not Found.",
        ]);
       }
         // Validasi input
         $validator = Validator::make($request->all(), [
            'title' => 'required|min:10',
            'author' => 'required|min:3',
            'description' => 'required|min:20',
            'shortDesc' => 'required|max:200',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => "Please fix the errors",
                'errors' => $validator->errors(),
            ]);
        }
    
        $blog->title = $request->title;
        $blog->author = $request->author;
        $blog->description = $request->description;
        $blog->shortDesc = $request->shortDesc;
        $blog->save();
    
        // Proses gambar jika ada image_id
        $tempImage = TempImage::find($request->image_id);

        if ($tempImage !== null) {

            File::delete(public_path(('uploads/blogs/'.$blog->image)));
            $imageExtArray = explode('.', $tempImage->name);
            $ext = last($imageExtArray);
            $imageName = time() . '-' . $blog->id . '.' . $ext;
    
            $blog->image = $imageName;
            $blog->save();
    
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $desPath = public_path('uploads/blogs/' . $imageName);
    
            // Salin file dan hapus file sementara
            if (File::copy($sourcePath, $desPath)) {
                File::delete($sourcePath);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => "Failed to copy the image",
                ], 500);
            }
        }
    
        return response()->json([
            'status' => true,
            'message' => "Blog Updated successfully",
            'data' => $blog,
        ]);
    }

    public function destroy($id){
        $blog = Blog::find($id);

        if($blog == null){
            return response()->json([
                'status' => false,
                'message' => "Failed to copy the image",
            ]);
        }

        File::delete(public_path('uploads/blogs/'.$blog->image));
        $blog->delete();
        
        return response()->json([
            'status' => true,
            'message' => "Blog delete successfully",
        ]);

    }
}
