import AppLayout from '@/layouts/app-layout'
import { useForm, Link } from '@inertiajs/react'
import { type BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: '/accounts',
    },
]

export default function Create() {
    type FormData = {
        name: string
    }

    const { data, setData, post, processing, errors } = useForm<FormData>({
        name: '',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        post('/accounts')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-10 w-full">
                <div className="space-y-12 sm:space-y-4">
                    <div>
                        <h2 className="text-base font-semibold text-white-900">Create Account Type</h2>
                    </div>
                    <div className="border-b border-gray-900/10">
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="name" className="block text-sm font-medium text-white-900">
                                    Account Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="mt-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="e.g., Cash, Credit Card"
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-2">
                    <Link href="/accounts" className="text-sm font-semibold text-white-900">
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