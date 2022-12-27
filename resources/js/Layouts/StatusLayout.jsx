import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function StatusLayout({ children }) {
    return (
        <div className="h-full mx-auto flex flex-col">
            <div className='bg-[#0e1432] block py-2'>
                <div className='max-w-7xl mx-auto px-4 md:px-12'>
                    <Link href="/">
                        <ApplicationLogo className="h-12 my-auto block fill-current text-gray-500" />
                    </Link>
                </div>
            </div>

            <main className='max-w-7xl w-full mx-auto mt-8 flex flex-col px-4 md:px-12'>
                {children}
            </main>
        </div>
    );
}
