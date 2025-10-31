import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { type BreadcrumbItem } from "@/types"
import { CategoryTable } from "@/components/categories-table"
import { Category } from "@/types/category"

interface CategoryPageProps {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
]

export default function Index({ categories }: CategoryPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <CategoryTable categories={categories} />
        </AppLayout>
    )
}