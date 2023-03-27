import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { faArrowDown, faCheck, faCircleExclamation, faClock } from '@fortawesome/free-solid-svg-icons';
import { Head, usePage } from '@inertiajs/inertia-react';
import StatCard from '@/Components/StatCard';
import Maintainance from './Maintainance';

export default function(props) {
    const { monitor, maintainances } = usePage().props

    const uptime = Math.round((100 - ((100 * monitor.downtime) / 525600)) * 100000) / 100000 + '%';

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Monitor"/>

            <h2 className='text-2xl mb-2'>Statistics</h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
                <StatCard icon={faCircleExclamation} title={'Incidents'} value={monitor.incidents}/>
                <StatCard icon={faClock} title={'Maintainance At'} value={monitor.maintainance_at ?? 'Not Planned'}/>
                <StatCard icon={faArrowDown} title={'Total Downtime'} value={monitor.downtime + ' Minutes'}/>
                <StatCard icon={faCheck} title={'Uptime This Year'} value={uptime}/>
            </div>

            <Maintainance maintainances={maintainances} monitor={monitor}/>
        </AuthenticatedLayout>
    );
}
