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

    public function signals($id)
    {
        return Signal::where('account_id', $id)->get();
    }
}
