import { Head } from '@inertiajs/inertia-react';
import React from 'react';
import StatusLayout from '@/Layouts/StatusLayout';
import Groups from './Components/Groups';
import StatusBar from './Components/StatusBar';
import LastIncidents from './Components/History';

export default function Index() {
    return (
        <StatusLayout>
            <Head title="Status" />
            
            <div className='mb-12'>
                <StatusBar/>
            </div>

            <Groups/>

            <div className='my-8'>
                <LastIncidents/>
            </div>
        </StatusLayout>
    );
}