<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Signal;

class SignalController extends Controller
{
    public function index(Request $request)
    {
        $query = Signal::query();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }


        return $query->get();
    }

    public function store()
    {
        $account = Account::findOrFail(request('account_id'));
        return $account->signals()->create([
            'type' => request('type'),
            'status' => 'active',
            'payload' => request('payload')
        ]);
    }

    public function archive($id)
    {
        $signal = Signal::findOrFail($id);
        $signal->status = 'archived';
        $signal->save();

        return $signal;
    }
}
