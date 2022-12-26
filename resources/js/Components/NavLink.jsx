import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={
                active
                    ? 'inline-flex items-center px-1 pt-1 border-b-4 border-white text-sm font-medium leading-5 text-white focus:outline-none focus:border-white transition duration-150 ease-in-out'
                    : 'inline-flex items-center px-1 pt-1 border-b-4 border-transparent text-sm font-medium leading-5 text-gray-100 hover:text-white hover:border-white focus:outline-none focus:text-gray-700 focus:border-white transition duration-150 ease-in-out'
            }
        >
            {children}
        </Link>
    );
}
