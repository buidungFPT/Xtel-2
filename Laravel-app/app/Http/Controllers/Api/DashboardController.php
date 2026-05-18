<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
class DashboardController extends Controller
{
    public function index()
    {
       $revenueByDays = Order::select(
        DB::raw('DATE(created_at) as date'),
        DB::raw('SUM(total_price) as total')
    )
    ->where('status', 'completed')
    ->groupBy('date')
    ->orderBy('date', 'ASC')
    ->get();


    $recentOrders = Order::with('user')
    ->latest()
    ->take(5)
    ->get();
     

    $bestSellingProducts = OrderDetail::select(
        'product_id', 
        DB::raw('SUM(quantity) as total_sold' )
    )
    ->with('product')->groupBy('product_id') -> orderByDesc('total_sold')->take(5)->get();

    
    
        return response()->json([
    'message' => 'Dashboard data',
    'data' => [
        'total_revenue' => Order::where('status', 'completed')->sum('total_price'),
        'total_orders' => Order::count(),
        'total_products' => Product::count(),
        'total_customers' => User::where('role', 'user')->count(),

        'revenue_by_days' => $revenueByDays,
        'recent_orders' => $recentOrders,
        'best_selling_product' => $bestSellingProducts
    ]
]);
    }
}