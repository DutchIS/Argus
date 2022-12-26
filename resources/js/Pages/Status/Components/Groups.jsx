import { usePage } from "@inertiajs/inertia-react"
import Group from "./Group"

export default function Groups() {
    const { groups } = usePage().props

    return (
        <>
            {groups.map((group) => (
                <Group key={group.id} group={group} />
            ))}
        </>
    )
}