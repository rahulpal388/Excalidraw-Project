import { ReactNode } from "react"


export function ToolBarItems({ children, onClick, active }: {
    children: ReactNode,
    onClick: () => void,
    active: boolean
}) {
    return <div onClick={onClick} className={`rounded active:bg-[#403E6A]   w-10 h-8 flex justify-center items-center cursor-pointer p-2 ${active ? "bg-blue-600  " : "hover:bg-[#31303B]"}`}>
        {children}

    </div>
}
