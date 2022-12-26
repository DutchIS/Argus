import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function StatCard(props) {
    return (
        <div className='bg-white rounded-md border-2 p-4 grid gap-2 grid-cols-5'>
            <FontAwesomeIcon icon={props.icon} className='text-4xl text-gray-500 my-auto col-span-1' />
            <div className='col-span-4'>
                <h3 className='text-lg font-medium text-gray-800'>{props.title}</h3>
                <label className='text-2xl font-semibold'>{props.value}</label>
            </div>
        </div>
    )
}