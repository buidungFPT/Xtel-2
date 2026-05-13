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
    // ADMIN: lấy tất cả đơn hàng
    public function index()
    {
        return response()->json([
            'message' => 'Lấy danh sách đơn hàng thành công',
            'data' => Order::with(['user', 'orderDetails.product'])
                ->latest()
                ->get()
        ]);
    }

    // USER: đặt hàng
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
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Bạn cần đăng nhập để đặt hàng'
            ], 401);
        }

        $totalMoney = 0;

        foreach ($request->items as $item) {
            $product = Product::findOrFail($item['product_id']);

            if ($product->quantity < $item['quantity']) {
                DB::rollBack();

                return response()->json([
                    'message' => 'Sản phẩm ' . $product->name . ' không đủ số lượng'
                ], 422);
            }

            $totalMoney += $product->price * $item['quantity'];
        }

        $order = Order::create([
            'user_id' => $user->id,
            'customer_name' => $request->customer_name,
            'phone' => $request->phone,
            'address' => $request->address,
            'total_price' => $totalMoney,
            'status' => 'pending',
        ]);

        foreach ($request->items as $item) {
            $product = Product::findOrFail($item['product_id']);

            OrderDetail::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
                'total_price' => $product->price * $item['quantity'],
            ]);

            $product->decrement('quantity', $item['quantity']);
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

    // ADMIN: xem chi tiết 1 đơn
    public function show($id)
    {
        $order = Order::with(['user', 'orderDetails.product'])->find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Không tìm thấy đơn hàng'
            ], 404);
        }

        return response()->json([
            'message' => 'Lấy chi tiết đơn hàng thành công',
            'data' => $order
        ]);
    }

    // ADMIN: cập nhật trạng thái đơn
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipping,completed,cancelled',
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Không tìm thấy đơn hàng'
            ], 404);
        }

        $order->update([
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Cập nhật trạng thái đơn hàng thành công',
            'data' => $order->load('orderDetails.product')
        ]);
    }

    // ADMIN: xóa đơn
    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'message' => 'Không tìm thấy đơn hàng'
            ], 404);
        }

        $order->delete();

        return response()->json([
            'message' => 'Xóa đơn hàng thành công'
        ]);
    }

    // USER: xem đơn hàng của chính user đang đăng nhập
    public function myOrders(Request $request)
    {
        $orders = Order::with('orderDetails.product')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'message' => 'Lấy đơn hàng của tôi thành công',
            'data' => $orders
        ]);
    }
}