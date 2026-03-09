<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Signal;

class AccountController extends Controller
{
    public function index()
    {
        return Account::all();
    }

    public function signals(Request $request,$id)
    {
        // query signals belonging to the specific account
        $query =Signal::where('account_id', $id);

        //filter by status and type if provided in the request
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        return $query->get();
    }
}
