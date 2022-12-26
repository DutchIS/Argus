export default function Group(props) {
    return (
        <div className="mb-8">
            <div className="mb-4">
                <h2 className='text-2xl'>{props.group.name}</h2>
                <p className="text-md">{props.group.description}</p>
            </div>

            <div className="bg-white rounded-md border-2">
                {props.group.monitors.length == 0 ?
                    <div className="m-4">
                        <p className="text-center text-xl">No monitors in this group</p>
                    </div>
                    :
                    props.group.monitors.map((monitor, index) => (
                        <div key={monitor.id} className={(props.group.monitors.length - 1) != index && 'border-b-2'}>
                            <div className="m-4 flex">
                                <div className="flex">
                                    <h3 className='text-xl'>{monitor.name}</h3>
                                    {monitor.online ?
                                        <label className="bg-green-200 text-green-600 ml-2 text-sm font-bold rounded-md px-2 py-1">{(monitor.ping == 0) ? '>1' : monitor.ping}ms</label>
                                    :
                                        <label className="bg-red-200 text-red-600 ml-2 text-sm font-bold rounded-md px-2 py-1">Offline</label>
                                    }
                                </div>

                                <div className="ml-auto flex">
                                    {monitor.incident_days.map((day, index) => (
                                        (day.downtime == 0) ?
                                            <div className="relative group">
                                                <div className="absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white hidden group-hover:block">
                                                    No downtime today
                                                </div>
                                                <label className="bg-green-200 group-hover:bg-green-300 transition-colors px-1 py-2 rounded-md ml-1"></label>
                                            </div>
                                        :
                                            <div className="relative group">
                                                <div className="absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white hidden group-hover:block">
                                                    {day.incidents.length} incident on this day.<br/>
                                                    Totaling {day.downtime} minutes.
                                                </div>
                                                <label className="bg-red-200 group-hover:bg-red-300 transition-colors px-1 py-2 rounded-md ml-1"></label>
                                            </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}