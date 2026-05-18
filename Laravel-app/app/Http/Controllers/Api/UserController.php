<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get();
        return response()->json([
            'message' => 'lấy danh sách user thành công',
            'data' => $users
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|uninque:users,email',
            'password' => 'required|string|min:6',
            'role' => ['required', Rule::in(['admin', 'business', 'user'])],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'role' => $request->role
        ]);

        return response()->json([
            'message' => 'thêm người dùng thành công',
            'data' => $user
        ]);
    }
    public function update(Request $request, $id)
{
    $user = User::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'email',
            Rule::unique('users', 'email')->ignore($user->id),
        ],
        'role' => ['required', Rule::in(['admin', 'user', 'business'])],
        'password' => 'nullable|string|min:6',
    ]);

    $data = [
        'name' => $request->name,
        'email' => $request->email,
        'role' => $request->role,
    ];

    if ($request->filled('password')) {
        $data['password'] = Hash::make($request->password);
    }

    $user->update($data);

    return response()->json([
        'message' => 'Cập nhật người dùng thành công',
        'data' => $user
    ]);
}
    public function destroy($id) {
       $user = User::findOrFail($id);
       if(auth()->id()===$user->id){
        return  response()->json([
            'message'=> " Bạn không thể xóa chính tài khoản đang đăng nhập "
        ],422);
       }
       $user->delete();
       return response()->json([
        'message'=>'Xóa tài khoản thành công d'
       ]) ;
    }
    
 }