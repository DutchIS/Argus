import { Link } from '@inertiajs/inertia-react';

export default function ResponsiveNavLink({ method = 'get', as = 'a', href, active = false, children }) {
    return (
        <Link
            method={method}
            as={as}
            href={href}
            className={`w-full flex items-start pl-3 pr-4 py-2 border-l-4 ${
                active
                    ? 'border-gray-400 text-gray-50 bg-gray-700'
                    : 'border-transparent text-gray-200 hover:text-gray-100 hover:bg-opacity-80 hover:bg-gray-800 hover:border-gray-700 '
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
