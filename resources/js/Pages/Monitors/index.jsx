import Table from '@/Components/Table';
import TableData from '@/Components/TableData';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { Head, usePage } from '@inertiajs/inertia-react';

export default function(props) {
    const { monitors } = usePage().props

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Monitors" />

            <h2 className='text-2xl mb-2'>Monitors</h2>
            <Table headers={['Name', 'Type', 'Destination', 'Maintenance Planned']} >
                {monitors.data.map((monitor, index) => (
                    <tr class="hover:bg-gray-50 cursor-pointer" key={index} onClick={() => Inertia.visit(route('monitors.view', monitor.id))}>
                        <TableData>{monitor.name}</TableData>
                        <TableData>{monitor.type}</TableData>
                        <TableData>{monitor.destination}</TableData>
                        <TableData>
                            {monitor.maintenance_at ?
                                new Date(monitor.maintenance_at).toLocaleString()
                            :
                                '-'
                            }
                        </TableData>
                    </tr>
                ))}
            </Table>
        </AuthenticatedLayout>
    );
}
