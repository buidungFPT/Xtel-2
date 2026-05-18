<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);
        $imagePath = null;
        if ($request->hasFile('image')){
            $imagePath=$request
            ->file('image')->store('producs','public');
        }


        $product = Product::create([
            'name' => $request->name,

            'price' => $request->price,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id,
            'description' => $request->description,
             'image' => $imagePath,
        ]);

        return response()->json([
            'message' => 'San pham da duoc tao',
            'data' => $product
        ], 201);
    }
    public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'quantity' => 'required|integer',
        'category_id' => 'required',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
    ]);

    if ($request->hasFile('image')) {

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->image = $request
            ->file('image')
            ->store('products', 'public');
    }

    $product->name = $request->name;
    $product->price = $request->price;
    $product->quantity = $request->quantity;
    $product->category_id = $request->category_id;
    $product->description = $request->description;

    $product->save();

    return response()->json([
        'message' => 'Cập nhật thành công',
        'data' => $product
    ]);
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