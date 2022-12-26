import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/inertia-react';
import StatCard from './Components/StatCard';
import { faAngleUp, faAngleDown, faCheck, faClock } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard(props) {
    const { services_up, services_down, downtime } = usePage().props

    const uptime = Math.round((100 - ((100 * downtime) / 525600)) * 100000) / 100000 + '%';

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />

            <h2 className='text-2xl mb-2'>Statistics</h2>
            <div className='grid grid-cols-4 gap-4'>
                <StatCard icon={faAngleDown} title={'Services Down'} value={services_down}/>
                <StatCard icon={faAngleUp} title={'Services Up'} value={services_up}/>
                <StatCard icon={faClock} title={'Total Downtime'} value={downtime + ' minutes'}/>
                <StatCard icon={faCheck} title={'Uptime This Year'} value={uptime}/>
            </div>
        </AuthenticatedLayout>
    );
}
