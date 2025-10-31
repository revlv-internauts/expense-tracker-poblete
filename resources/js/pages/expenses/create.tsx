import AppLayout from '@/layouts/app-layout'
import { useForm, Link } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types'

type Account = {
    id: number
    name: string
}

type Category = {
    id: number
    name: string
}

interface ExpenseCreateProps {
    accounts: Account[]
    categories: Category[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: '/expenses',
    },
]

export default function Create({ accounts, categories }: ExpenseCreateProps) {
    type ExpenseFormData = {
    account_id: number
    category_id: number
    description: string
    date: string
    amount: string
    }

    const { data, setData, post, processing, errors } = useForm<ExpenseFormData>({
    account_id: 0,
    category_id: 0,
    description: '',
    date: '',
    amount: '',
    })

    function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    post('/expenses')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-10 w-full">
                <div className="space-y-12 sm:space-y-4">
                    <div>
                        <h2 className="text-base font-semibold text-white-900">Create Expense</h2>
                    </div>

                    <div className="border-b border-gray-900/10">
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-2">
                            <div className="sm:col-span-3">
                                <label htmlFor="account_id" className="block text-sm font-medium text-white-900">
                                    Account
                                </label>
                                <select
                                    id="account_id"
                                    name="account_id"
                                    value={data.account_id}
                                    onChange={(e) => setData('account_id', Number(e.target.value))}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value={0}>Select Account</option>
                                    {accounts.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.account_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.account_id}</p>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category_id" className="block text-sm font-medium text-white-900">
                                    Category
                                </label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', Number(e.target.value))}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                >
                                    <option value={0}>Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="description" className="block text-sm font-medium text-white-900">
                                    Description
                                </label>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="amount" className="block text-sm font-medium text-white-900">
                                    Amount
                                </label>
                                <input
                                    id="amount"
                                    name="amount"
                                    type="number"
                                    min={0.00}
                                    value={data.amount}
                                    onChange={(e) => setData('amount', e.target.value)}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-2">
                    <Link href="/expenses" className="text-sm font-semibold text-white-900">
                        <button
                            className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                            Back
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </AppLayout>
    )
}