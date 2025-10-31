export interface Expense {
    id: number;
    description: string;
    amount: number;
    created_at: string;
    updated_at: string;
    account_id: number;
    category_id: number;
    account: {
        id: number;
        name: string;
    }
    category: {
        id: number;
        name: string;
    }
}