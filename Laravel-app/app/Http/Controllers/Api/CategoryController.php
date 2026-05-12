<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
      public function show(Category $category)
    {
        return response()->json([
            'message' => 'Chi tiết danh mục',
            'data' => $category
        ]);
    }
   public function index(){
        return response() ->json([
            'message' => 'Danh sách danh mục',
            'data' => Category::latest( )->get()
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|unique:categories,name'
        ]);

        $category = Category::create([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Danh mục đã được tạo thành công',
            'data' => $category
        ], 201);
    }
    

  public function update(Request $request, $id){
        $request->validate([
            'name' => 'required|unique:categories,name,' . $id
        ]);

        $category = Category::findOrFail($id);
        $category->update([
            'name' => $request->name
        ]);

        return response()->json([
            'message' => 'Danh mục đã được cập nhật thành công',
            'data' => $category
        ]);
    }

    public function destroy($id){
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Danh mục đã được xóa thành công'
        ]);
    }
}