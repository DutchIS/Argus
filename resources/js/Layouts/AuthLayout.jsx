import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function AuthLayout(props) {
    return (
        <div className="h-full mx-auto flex flex-col">
            <div className='bg-[#0e1432] block py-2'>
                <div className='max-w-7xl mx-auto'>
                    <Link href="/">
                        <ApplicationLogo className="h-12 my-auto block fill-current text-gray-500" />
                    </Link>
                </div>
            </div>
            
            <div className="max-w-lg w-full mx-auto flex flex-col mt-12">
                <h1 className='text-4xl font-medium mb-4 text-left'>{props.title}</h1>
                {props.children}
            </div>
        </div>
    )
}