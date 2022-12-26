import { Head } from '@inertiajs/inertia-react';
import React from 'react';
import StatusLayout from '@/Layouts/StatusLayout';
import Groups from './Components/Groups';

export default function Index() {
    return (
        <StatusLayout>
            <Head title="Status" />
            <Groups/>
        </StatusLayout>
    );
}