<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{


    public function index()
    {
        return response()->json([
            'message' => ' danh sach san pham',
            'data' => Product::with('category')->latest()->get()
        ]);
    }
    public function show(Product $product)
    {
        return response()->json([
            'message' => 'Chi tiết sản phẩm',
            'data' => $product
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:products,name',

            'price' => 'required|numeric',
            'quantity' => 'required|numeric',
            'category_id' => 'required|exists:categories,id'
        ]);

        $product = Product::create([
            'name' => $request->name,

            'price' => $request->price,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id
        ]);

        return response()->json([
            'message' => 'San pham da duoc tao',
            'data' => $product
        ], 201);
    }
    public function Update(Request $request, $id)
    {
        $request->validate([
             'name' => 'required|string|max:255',
            'quantity' => 'required|numeric',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id'
        ]);

        $product = Product::findOrFail($id);
        $product->update([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'category_id' => $request->category_id
        ]);

        return response()->json([
            'message' => 'San pham da duoc cap nhat',
            'data' => $product
        ], 201);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'San pham da duoc xoa'
        ], 201);
    }
}