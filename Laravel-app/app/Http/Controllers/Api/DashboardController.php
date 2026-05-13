<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Lấy dữ liệu dashboard thành công',
            'data' => [
                'total_revenue' => Order::where('status', 'completed')->sum('total_price'),
                'total_orders' => Order::count(),
                'total_products' => Product::count(),
                'total_customers' => User::where('role', 'user')->count(),
            ]
        ]);
    }
}