import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

export default function Index() {
    return (
        <AppLayout>
            <Head title="Expenses" />
            <h1>Expenses</h1>
        </AppLayout>
    )
}