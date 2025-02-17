

export function Button({ BtnName, onClick }: {
    BtnName: string,
    onClick: () => void
}) {
    return <button onClick={onClick} className="ui-bg-green-300 ui-text-green-800 py-2 px-4 rounded ">{BtnName}</button>
}