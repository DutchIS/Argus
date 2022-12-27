import { usePage } from "@inertiajs/inertia-react"

function getDateXDaysAgo(numOfDays, date = new Date()) {
    const daysAgo = new Date(date.getTime());

    daysAgo.setDate(date.getDate() - numOfDays);

    return daysAgo;
}

function Day(props) {
    return (
        <div className={props.className}>
            <h3 className="p-3 bg-gray-50 text-gray-600 text-sm">
                {getDateXDaysAgo(props.index).toDateString()}
            </h3>

            {props.item.incidents.map((incident) => (
                <div className="p-3 flex flex-col border-t" key={incident.id}>
                    <div className="flex mb-1">
                        <label className="rounded-md bg-red-200 px-2 py-0.5 text-sm font-bold text-red-700 mb-1 w-fit">Incident</label>
                        <h4 className="text-gray-800 font-medium ml-2 text-lg">{} - {incident.reason}</h4>
                    </div>
                    <p className="text-gray-600 font-medium">{new Date(incident.created_at).toLocaleTimeString()} - {incident.finished_at ? new Date(incident.finished_at).toLocaleTimeString() : 'Ongoing'}</p>
                </div>  
            ))}
        </div>
    )
}

export default function History() {
    const { status_history } = usePage().props

    return (
        <>
            <h2 className="text-2xl mb-2">Status History</h2>
            <div className="bg-white rounded-md border-2">
                {status_history.map((item, index) => (
                    <Day key={item.id} index={index} item={item} className={((status_history.length - 1) != index) && 'border-b-2'} />
                ))}
            </div>
        </>
    )
}