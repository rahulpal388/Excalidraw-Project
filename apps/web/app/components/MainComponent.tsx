"use client"
import React, { useEffect, useRef, useState } from "react"
import { initDraw } from "../drawCanvas"
import { CircleIcon, CursorIcon, RectangleIcon } from "../IconsSvgs/IconSvgs"
import { ArrowRightIcon, DiamondIcon, EraserIcon, LetterTextIcon, PencilIcon, Wind } from "lucide-react"
import { ToolBarItems } from "./toolBarItems"


export interface IAction {
    type: "text" | "rect" | "circle" | "pencile" | "line" | "pointer" | "dimond " | "erase" | "drag"
}


export function MainCanva({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const dynamicCanvaRef = useRef<HTMLCanvasElement>(null);
    const staticCanvaRef = useRef<HTMLCanvasElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const previousText = useRef<string>("")
    const action = useRef<IAction>({
        type: "pointer"
    })

    useEffect(() => {
        window.scrollTo({ left: 5000, top: 5000, behavior: "smooth" })
    }, [])


    useEffect(() => {
        if (dynamicCanvaRef.current && textAreaRef.current && staticCanvaRef.current) {

            initDraw(roomId, socket, dynamicCanvaRef.current, staticCanvaRef.current, action.current, textAreaRef)
        }

    }, [dynamicCanvaRef, staticCanvaRef, textAreaRef])



    return <div className="w-max h-max scroll-smooth">
        <canvas className=" overflow-auto  overscroll-contain   " ref={staticCanvaRef} height={10000} width={10000}  ></canvas>
        <canvas className="absolute  top-0 left-0 hidden overflow-auto bg-transparent  overscroll-contain  " ref={dynamicCanvaRef} height={10000} width={10000} ></canvas>
        <ToolBar shapeType={action.current} dynamicCanvaRef={dynamicCanvaRef} />
        <textarea ref={textAreaRef} className={`hidden h-12  min-w-12   absolute will-change-contents  top-[5200px] left-[5200px]  outline-none resize-none overflow-x-visible overflow-y-hidden`} onChange={(e) => {

            // to increase and decrease the textarea accroding to contents
            if (previousText.current.length < e.currentTarget.value.length) {
                e.currentTarget.style.width = `${e.currentTarget.clientWidth + 8}px`
                previousText.current = e.currentTarget.value
            } else {
                e.currentTarget.style.width = `${e.currentTarget.clientWidth - 8}px`
                if (e.currentTarget.value.length <= 1) {
                    previousText.current = ""
                }

            }
        }}
        ></textarea>
        {/* bg-[#121212] */}
    </div>
}


function ToolBar({ shapeType, dynamicCanvaRef }: {
    shapeType: IAction,
    dynamicCanvaRef: React.RefObject<HTMLCanvasElement | null>

}) {
    const [selectedTool, setSelectedTool] = useState<IAction>({ type: "pointer" })

    return <div className="fixed left-96  top-4 z-20  h-[2.5rem] bg-[#232329] rounded py-1 px-4  ">
        <div className="flex items-center gap-3">
            <ToolBarItems active={shapeType.type === "pointer"} children={<CursorIcon />} onClick={() => {
                shapeType.type = "pointer"
                setSelectedTool({ type: "pointer" })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "none"
            }} />
            <ToolBarItems active={shapeType.type === "rect"} children={<RectangleIcon />} onClick={() => {
                shapeType.type = "rect"
                setSelectedTool({ type: "rect" })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "block"
                console.log(shapeType.type)

            }} />
            <ToolBarItems active={shapeType.type === "circle"} children={<CircleIcon />} onClick={() => {
                shapeType.type = "circle"
                setSelectedTool({ type: "circle" })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "block"
                console.log(shapeType.type)

            }} />
            <ToolBarItems active={shapeType.type === "line"} children={<ArrowRightIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "line"
                setSelectedTool({ type: "line" })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "block"
            }} />
            <ToolBarItems active={shapeType.type === "dimond "} children={<DiamondIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "dimond "
                setSelectedTool({ type: "dimond " })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "block"
            }} />
            {/* <ToolBarItems active={shapeType.type === "text"} children={<LetterTextIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "text"
                setSelectedTool({ type: "text" })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "block"
            }} /> */}
            {/* <ToolBarItems active={shapeType.type === "pencile"} children={<PencilIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "pencile"
                setSelectedTool({ type: "pencile" })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "block"
            }} /> */}
            <ToolBarItems active={shapeType.type === "erase"} children={<EraserIcon className="text-white h-5 " />} onClick={() => {
                shapeType.type = "erase"
                setSelectedTool({ type: "erase" })
                if (!dynamicCanvaRef.current) return
                dynamicCanvaRef.current.style.display = "none"
            }} />

        </div>
    </div>
}



