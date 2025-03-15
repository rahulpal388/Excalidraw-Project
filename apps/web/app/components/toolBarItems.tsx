import { ReactNode } from "react"


export function ToolBarItems({ children, onClick, selectedTool }: {
    children: ReactNode,
    onClick: () => void,
    selectedTool: boolean
}) {
    return <div onClick={onClick} className={`rounded active:bg-[#403E6A]   w-10 h-8 flex justify-center items-center cursor-pointer p-2 ${selectedTool ? "bg-blue-600  " : "hover:bg-[#31303B]"}`}>
        {children}

    </div>
}
