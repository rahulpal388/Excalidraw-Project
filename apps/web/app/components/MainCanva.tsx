"use client"
import React, { useEffect, useRef, useState } from "react"
import { initDraw } from "../drawCanvas"
import { CircleIcon, CursorIcon, RectangleIcon } from "../IconsSvgs/IconSvgs"
import { ArrowRightIcon, DiamondIcon, EraserIcon, LetterTextIcon, PencilIcon } from "lucide-react"
import { ToolBarItems } from "./toolBarItems"


export interface IShapeType {
    type: "text" | "rect" | "circle" | "pencile" | "line" | "resize" | "dimond " | "erase"
}


export function MainCanva({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const canvaRef = useRef<HTMLCanvasElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const shapeTypeRef = useRef<IShapeType>({
        type: "resize"
    })

    useEffect(() => {
        window.scrollTo({ left: 5000, top: 5000, behavior: "smooth" })
    }, [])


    useEffect(() => {
        if (canvaRef.current && textAreaRef.current) {
            initDraw(roomId, socket, canvaRef.current, shapeTypeRef.current, textAreaRef.current)
        }

    }, [canvaRef, textAreaRef])



    return <div className="w-max h-max scroll-smooth">
        <ToolBar shapeType={shapeTypeRef.current} />
        <canvas className="overflow-auto  overscroll-contain " ref={canvaRef} height={10000} width={10000}  ></canvas>
        <textarea ref={textAreaRef} className="  hidden fixed   top-[200px] left-[200px] bg-[#121212] text-white outline-none resize-none "></textarea>

    </div>
}


function ToolBar({ shapeType }: {
    shapeType: IShapeType,
}) {
    const [selectedTool, setSelectedTool] = useState<IShapeType>({ type: "resize" })
    return <div className="fixed left-96  top-4   h-[2.5rem] bg-[#232329] rounded py-1 px-4  ">
        <div className="flex items-center gap-3">
            <ToolBarItems active={shapeType.type === "resize"} children={<CursorIcon />} onClick={() => {
                shapeType.type = "resize"
                setSelectedTool({ type: "resize" })

            }} />
            <ToolBarItems active={shapeType.type === "rect"} children={<RectangleIcon />} onClick={() => {
                shapeType.type = "rect"
                setSelectedTool({ type: "rect" })
            }} />
            <ToolBarItems active={shapeType.type === "circle"} children={<CircleIcon />} onClick={() => {
                shapeType.type = "circle"
                setSelectedTool({ type: "circle" })
            }} />
            <ToolBarItems active={shapeType.type === "line"} children={<ArrowRightIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "line"
                setSelectedTool({ type: "line" })
            }} />
            <ToolBarItems active={shapeType.type === "dimond "} children={<DiamondIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "dimond "
                setSelectedTool({ type: "dimond " })
            }} />
            <ToolBarItems active={shapeType.type === "text"} children={<LetterTextIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "text"
                setSelectedTool({ type: "text" })
            }} />
            <ToolBarItems active={shapeType.type === "pencile"} children={<PencilIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "pencile"
                setSelectedTool({ type: "pencile" })
            }} />
            <ToolBarItems active={shapeType.type === "erase"} children={<EraserIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "erase"
                setSelectedTool({ type: "erase" })
            }} />

        </div>
    </div>
}



