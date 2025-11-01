<?php

namespace Tests\Feature;

use App\Models\Account;
use App\Models\Category;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExpenseControllerTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_can_view_expenses()
    {
        $user = User::factory()->create();

        $account = Account::factory()->create([
            'user_id' => $user->id,
        ]);

        $category = Category::factory()->create([
            'user_id' => $user->id,
        ]);

        $expense = Expense::factory()->create([
            'user_id' => $user->id,
            'account_id' => $account->id,
            'category_id' => $category->id,
        ]);

        $resp = $this->actingAs($user)->get('/expenses');

        $resp->assertStatus(200);
    }

    public function test_guest_user_cannot_view_expenses_page()
    {
        $this->get('/expenses')
            ->assertRedirect('/login')
            ->assertStatus(302);
    }

    public function test_user_can_create_expense()
    {
        $user = User::factory()->create();

        $other = User::factory()->create();

        $account = Account::factory()->create([
            'user_id' => $user->id,
        ]);

        $category = Category::factory()->create([
            'user_id' => $user->id,
        ]);

        $resp = $this->actingAs($user)->post(route('expenses.store'), [
            'description' => 'McDonalds Buendia',
            'amount' => 99,
            'account_id' => $account->id,
            'category_id' => $category->id,
        ]);

        $resp->assertRedirect('/expenses');

        $this->assertDatabaseHas('expenses', [
            'user_id' => $user->id,
            'description' => 'McDonalds Buendia',
            'amount' => 99,
        ]);
    }

    public function test_user_can_update_expense()
    {
        $user = User::factory()->create();

        $other = User::factory()->create();

        $account = Account::factory()->create([
            'user_id' => $user->id,
        ]);

        $category = Category::factory()->create([
            'user_id' => $user->id,
        ]);

        $expense = Expense::factory()->create([
            'user_id' => $user->id,
            'account_id' => $account->id,
            'category_id' => $category->id,
        ]);

        $resp = $this->actingAs($user)->put(route('expenses.update', $expense), [
            'description' => 'Jollibee Noveleta',
            'amount' => 78,
            'account_id' => $account->id,
            'category_id' => $category->id,
        ]);

        $resp->assertRedirect('/expenses');

        $this->assertDatabaseHas('expenses', [
            'id' => $expense->id,
            'description' => 'Jollibee Noveleta',
            'amount' => 78,
        ]);
    }

    public function test_user_can_delete_expense()
    {
        $user = User::factory()->create();

        $expense = Expense::factory()->create([
            'user_id' => $user->id,
        ]);

        $resp = $this->actingAs($user)->delete("expenses/{$expense->id}");

        $resp->assertRedirect('/expenses');

        $this->assertDatabaseMissing('expenses', [
            'id' => $expense->id,
        ]);
    }

    public function test_user_can_edit_expense()
    {
        $user = User::factory()->create();

        $account = Account::factory()->create([
            'user_id' => $user->id,
        ]);

        $category = Category::factory()->create([
            'user_id' => $user->id,
        ]);

        $expense = Expense::factory()->create([
            'user_id' => $user->id,
            'account_id' => $account->id,
            'category_id' => $category->id,
        ]);

        $resp = $this->actingAs($user)->get("/expenses/{$expense->id}/edit");

        $resp->assertInertia(fn ($page) =>
            $page->component('expenses/edit')
            ->where('expense.id', $expense->id)
            ->has('accounts')
            ->has('categories')
        );
    }
}
