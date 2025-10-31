<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Category;
use App\Models\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::where('user_id', Auth::id())
            ->latest()
            ->with('account', 'category')
            ->get();

        return Inertia::render('expenses/index', [
            'expenses' => $expenses,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $accounts = Account::where('user_id', Auth::id())->get();
        $categories = Category::where('user_id', Auth::id())->get();

        return Inertia::render('expenses/create', [
            'accounts' => $accounts,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = $request->validate([
            'description' => [
                'required'
            ],
            'amount' => [
                'required',
                'numeric',
            ],
            'account_id' => [
                'required',
                'exists:accounts,id',
            ],
            'category_id' => [
                'required',
                'exists:categories,id',
            ],
        ]);

        Expense::create([
            ...$validation,
            'user_id' => Auth::id(),
        ]);

        return to_route('expenses.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        if ($expense->user_id !== Auth::id()) {
            abort(403);
        }

        $accounts = Account::where('user_id', Auth::id())->get();

        $categories = Category::where('user_id', Auth::id())->get();

        return Inertia::render('expenses/edit', [
            'expense' => $expense,
            'accounts' => $accounts,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        if ($expense->user_id !== Auth::id()) {
            abort(403);
        }

        $validation = $request->validate([
            'description' => [
                'required'
            ],
            'amount' => [
                'required',
                'numeric',
            ],
            'account_id' => [
                'required',
                'exists:accounts,id',
            ],
            'category_id' => [
                'required',
                'exists:categories,id',
            ],
        ]);

        $expense->update($validation);

        return to_route('expenses.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        if ($expense->user_id !== Auth::id()) {
            abort(403);
        }

        $expense->delete();

        return to_route('expenses.index');
    }
}
