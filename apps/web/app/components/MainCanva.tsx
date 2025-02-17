"use client"
import React, { useEffect, useRef, useState } from "react"
import { initDraw } from "../drawCanvas"
import { CircleIcon, CursorIcon, RectangleIcon } from "../IconsSvgs/IconSvgs"
import { ArrowRightIcon, DiamondIcon, EraserIcon } from "lucide-react"
import { ToolBarItems } from "./toolBarItems"


export interface IShapeType {
    type: "pointer" | "rect" | "circle" | "pencile" | "line" | "resize" | "dimond " | "erase"
}


export function MainCanva({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const canvaRef = useRef<HTMLCanvasElement>(null);
    const shapeTypeRef = useRef<IShapeType>({
        type: "resize"
    })

    useEffect(() => {
        window.scrollTo({ left: 5000, top: 5000, behavior: "smooth" })
    }, [])

    useEffect(() => {
        if (canvaRef.current) {

            initDraw(roomId, socket, canvaRef.current, shapeTypeRef.current)
        }

    }, [canvaRef])



    return <div className="w-max h-max scroll-smooth">
        <ToolBar shapeType={shapeTypeRef.current} />
        <canvas className="overflow-auto  overscroll-contain " ref={canvaRef} height={10000} width={10000}  ></canvas>

    </div>
}


function ToolBar({ shapeType }: {
    shapeType: IShapeType
}) {
    const [selectedTool, setSelectedTool] = useState<IShapeType>({ type: "pointer" })
    return <div className="fixed left-96  top-4  w-96 h-[2.5rem] bg-[#232329] rounded py-1 px-4  ">
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
            <ToolBarItems active={shapeType.type === "erase"} children={<EraserIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "erase"
                setSelectedTool({ type: "erase" })
            }} />
        </div>
    </div>
}



