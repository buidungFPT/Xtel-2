<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        return response()-> json([
            'message' => 'List Oders successfully',
            'data' => Order::with('orderDetails.product')-> latest() -> get()
        ]);    
    }

       public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $totalMoney = 0;

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);

                if ($product->quantity < $item['quantity']) {
                    return response()->json([
                        'message' => 'Sản phẩm ' . $product->name . ' không đủ số lượng'
                    ], 422);
                }

                $totalMoney += $product->price * $item['quantity'];
            }

            $order = Order::create([
                'customer_name' => $request->customer_name,
                'phone' => $request->phone,
                'address' => $request->address,
                'total_price' => $totalMoney,
                'status' => 'pending',
            ]);

            foreach ($request->items as $item) {
                $product = Product::find($item['product_id']);

                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'total_price' => $product->price * $item['quantity'],
                ]);

                $product->update([
                    'quantity' => $product->quantity - $item['quantity'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Đặt hàng thành công',
                'data' => $order->load('orderDetails.product')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Đặt hàng thất bại',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function show($id)
    {
        $order = Order::with('orderDetails.product')->find($id);
        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }
        return response()->json([
            'message' => 'Order details retrieved successfully',
            'data' => $order
        ]);
    }

    public function update(Request $request, $id){
        $request->validate([
            'customer_name' => 'sometimes|required|string|max:255',
            'phone'=> 'sometimes|required|string|max:20',
            'address' => 'sometimes|required|string|max:255',
          'total_price' => 'sometimes|required|numeric',
            'status' => 'required|in:pending,processing,shipping,completed,cancelled',
        ]);

        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }
        $order->update($request->only('customer_name', 'phone', 'address', 'total_price', 'status'));
        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $order
        ]);
    }
    
    public function destroy($id){
        $order = Order::find($id);
        if (!$order) {
            return response()->json([
                'message' => 'Order not found'
            ], 404);
        }
        $order->delete();
        return response()->json([
            'message' => 'Order deleted successfully'
        ]);
    }
}   