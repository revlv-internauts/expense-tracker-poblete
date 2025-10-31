import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { type BreadcrumbItem } from "@/types";
import { ExpenseTable } from "@/components/expenses-table";
import { Expense } from "@/types/expense";

interface ExpensePageProps {
    expenses: Expense[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Expenses',
        href: '/expenses',
    },
]

export default function Index({ expenses }: ExpensePageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />
            <ExpenseTable expenses={expenses} />
        </AppLayout>
    )
}