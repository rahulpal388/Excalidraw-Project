import { ArrowRightIcon, DiamondIcon } from "lucide-react"
import { CircleIcon, CursorIcon, RectangleIcon } from "../IconsSvgs/IconSvgs"
import { IAction } from "./MainComponent"
import { ToolBarItems } from "./toolBarItems"

export function ToolBar({ selectedTool, setSelectedTool }: {
    selectedTool: IAction
    setSelectedTool: React.Dispatch<React.SetStateAction<IAction>>

}) {

    return <div className="fixed left-96  top-4 z-20  h-[2.5rem] bg-[#232329] rounded py-1 px-4  ">
        <div className="flex items-center gap-3">
            <ToolBarItems selectedTool={selectedTool.type === "pointer"} children={<CursorIcon />} onClick={() => {
                setSelectedTool({ type: "pointer" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "rect"} children={<RectangleIcon />} onClick={() => {
                setSelectedTool({ type: "rect" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "circle"} children={<CircleIcon />} onClick={() => {
                setSelectedTool({ type: "circle" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "arrow"} children={<ArrowRightIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "arrow" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "dimond "} children={<DiamondIcon
                className="text-white h-5 " />} onClick={() => {
                    setSelectedTool({ type: "dimond " })
                }} />


            {/* <ToolBarItems selectedTool={selectedTool.type === "text"} children={<LetterTextIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "text" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "pencile"} children={<PencilIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "pencile" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "erase"} children={<EraserIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "erase" })
            }} /> */}

        </div>
    </div>
}
