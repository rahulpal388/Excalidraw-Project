"use client"
import React, { RefObject, SetStateAction, useEffect, useRef, useState } from "react"
import { initDraw } from "../drawCanvas"
import { CircleIcon, CursorIcon, RectangleIcon } from "../IconsSvgs/IconSvgs"
import { ArrowRightIcon } from "lucide-react"
import { ToolBarItems } from "./toolBarItems"
import { resizeShape } from "../drawCanvas/resizeShape"
import { mainFunction, setExistingShapeFunction } from "../drawCanvas/getShapes"


export interface IShapeType {
    type: "pointer" | "rect" | "circle" | "pencile" | "line" | "resize"
}

export type IAction = "draw" | "resize"

export function MainCanva({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const canvaRef = useRef<HTMLCanvasElement>(null);
    const shapeTypeRef = useRef<IShapeType>({
        type: "resize"
    })

    useEffect(() => {
        setExistingShapeFunction();
    }, [])
    useEffect(() => {
        if (canvaRef.current) {
            initDraw(roomId, socket, canvaRef.current, shapeTypeRef.current)

        }

    }, [canvaRef])
    return <div>
        <ToolBar shapeType={shapeTypeRef.current} />
        <canvas className="" ref={canvaRef} height={600} width={1250}></canvas>

    </div>
}


function ToolBar({ shapeType }: {
    shapeType: IShapeType
}) {
    const [selectedTool, setSelectedTool] = useState<IShapeType>({ type: "pointer" })
    return <div className="absolute left-96  top-4 w-96 h-[2.5rem] bg-[#232329] rounded py-1 px-4  ">
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
        </div>
    </div>
}



