import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { type BreadcrumbItem } from "@/types"
import { AccountTable } from "@/components/accounts-table"
import { Account } from "@/types/account"

interface AccountPageProps {
    accounts: Account[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Accounts',
        href: '/accounts',
    },
]

export default function Index({ accounts }: AccountPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Accounts" />
            <AccountTable accounts={accounts} />
        </AppLayout>
    )
}