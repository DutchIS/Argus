import TableData from "./TableData";

export default function(props) {
    return (
        <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="border-2 overflow-hidden border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y-2 divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    {props.headers.map((header, index) => (
                                        <th key={index} scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            { header }
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody class="bg-white divide-y divide-gray-200">
                                {props.children}

                                {props.children.length === 0 &&
                                    <TableData colSpan={props.headers.length} className='text-center'>
                                        No results found.
                                    </TableData>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}