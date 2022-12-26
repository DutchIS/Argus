import { usePage } from "@inertiajs/inertia-react"
import { faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function StatusBar() {
    const { incidents_ongoing } = usePage().props

    if (incidents_ongoing == 0) {
        return (
            <div className="bg-green-200 p-4 rounded-md border-2 border-green-300">
                <h2 className="text-xl text-green-700 font-semibold"><FontAwesomeIcon icon={faCheck} className='mr-4'/>Everything is running smoothly!</h2>
            </div>
        )
    }

    return (
        <div className="bg-red-200 p-4 rounded-md border-2 border-red-300">
            <h2 className="text-xl text-red-700 font-semibold"><FontAwesomeIcon icon={faTriangleExclamation} className='mr-4'/>{incidents_ongoing} service{(incidents_ongoing == 1) ? ' is' : 's are'} currently down</h2>
        </div>
    )
}