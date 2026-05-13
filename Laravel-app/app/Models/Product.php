<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'price',
        'quantity',
        'image',
        'description',
    ];

    // CATEGORY
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // ORDER DETAIL
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}