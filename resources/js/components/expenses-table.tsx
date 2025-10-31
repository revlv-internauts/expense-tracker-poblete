import { type Expense } from '@/types/expense'
import { Link, router } from '@inertiajs/react'
import { Plus } from 'lucide-react'

type ExpenseTableProps = {
  expenses: Expense[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
    function handleDelete(id: number) {
        if(confirm("Are you sure you want to delete this expense?")) {
            router.delete(`/expenses/${id}`)
        }
    }

    const total = expenses.reduce((total, expense) => total + Number(expense.amount), 0);

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center mt-4">
                    <div className="sm:flex-auto">
                        <p className="mt-2 text-sm font-black text-white-700">
                        Expense Tracker 
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                        href="/expenses/create"
                        className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                        <Plus className="inline w-4 h-4 mr-1" />
                        Add Expense
                        </Link>
                    </div>
                </div>
                <div className="mt-4 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-sm">
                                <table className="relative min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-bold text-gray-900 sm:pl-6">
                                                Account
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-gray-900">
                                                Category
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-gray-900">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-bold text-gray-900">
                                                Description
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-bold text-gray-900 sm:pr-6">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {expenses.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-6 text-center text-sm text-gray-600">
                                                Your expenses is empty.
                                                </td>
                                            </tr>
                                        ) : (
                                            expenses.map((expense) => (
                                                <tr key={expense.id}>
                                                    <td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap text-gray-900 sm:pl-6">
                                                        {expense.account.name}
                                                    </td>
                                                    <td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap text-gray-900 sm:pl-6">
                                                        {expense.category.name}
                                                    </td>
                                                    <td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap text-gray-900 sm:pl-6">
                                                        PHP {Number(expense.amount).toFixed(2)}
                                                    </td>
                                                    <td className="py-4 pr-3 pl-4 text-sm whitespace-nowrap text-gray-900 sm:pl-6">
                                                        {expense.description}
                                                    </td>
                                                    <td className="py-4 pr-4 pl-3 text-sm font-medium whitespace-nowrap sm:pr-6">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={`/expenses/${expense.id}/edit`}
                                                                className="text-white-600 hover:text-white-900"
                                                            >
                                                                <button
                                                                    className='bg-green-600 p-2 rounded-md'
                                                                >
                                                                    Edit<span className="sr-only"></span>
                                                                </button>
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(expense.id)}
                                                                className="text-white-600 hover:text-white-900 bg-red-700 p-2 rounded-md"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td colSpan={2} className="py-4 pr-3 pl-4 text-sm font-bold text-gray-900 sm:pl-6">
                                            Total
                                            </td>
                                            <td className="py-4 px-3 text-sm font-bold text-gray-900">
                                            PHP {total.toFixed(2)}
                                            </td>
                                            <td colSpan={3}></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}