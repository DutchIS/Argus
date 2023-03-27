export default function(props) {
    return (
        <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${props.className ?? ''}`} colSpan={props.colSpan}>
            {props.children}
        </td>
    )
}