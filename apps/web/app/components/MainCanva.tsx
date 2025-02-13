"use client"
import React, { JSX, ReactNode, RefObject, useEffect, useRef } from "react"
import { initDraw } from "../draw"
import circleIcon from "../../public/circle.svg"
import rectangleIcon from "../../public/rectangle.svg"
import { CircleIcon, CursorIcon, RectangleIcon } from "../IconsSvgs/IconSvgs"


export interface IShapeType {
    type: "cursor" | "rect" | "circle"
}

export function MainCanva({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const canvaRef = useRef<HTMLCanvasElement>(null);
    const shapeTypeRef = useRef<IShapeType>({
        type: "cursor"
    })

    // console.log(shapeTypeRef.current.type)
    useEffect(() => {
        if (canvaRef.current) {
            initDraw(canvaRef.current, roomId, socket, canvaRef.current, shapeTypeRef.current)
        }

    }, [canvaRef])
    return <div>
        <ToolBar shapeTypeRef={shapeTypeRef} />
        <canvas ref={canvaRef} height={600} width={1250}></canvas>
    </div>
}


function ToolBar({ shapeTypeRef }: {
    shapeTypeRef: RefObject<IShapeType>,
}) {

    return <div className="absolute left-96 top-4 w-96 h-[2.5rem] bg-[#232329] rounded py-1 px-4  ">
        <div className="flex items-center gap-3">
            <ToolBarItems children={<CursorIcon />} onClick={() => {
                shapeTypeRef.current.type = "cursor"
            }} />
            <ToolBarItems children={<RectangleIcon />} onClick={() => {
                shapeTypeRef.current.type = "rect"
            }} />
            <ToolBarItems children={<CircleIcon />} onClick={() => {
                shapeTypeRef.current.type = "circle"
            }} />
        </div>
    </div>
}

function ToolBarItems({ children, onClick }: {
    children: ReactNode,
    onClick: () => void,
}) {
    return <div onClick={onClick} className={`rounded active:bg-[#403E6A]  hover:bg-[#31303B] w-8 h-8 flex justify-center items-center cursor-pointer p-2 `}>
        {children}

    </div>
}