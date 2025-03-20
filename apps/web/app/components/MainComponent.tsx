"use client"
import React, { useEffect, useRef, useState } from "react"
import { existingShapes, initDraw, sCtx } from "../drawCanvas"
import { CircleIcon, CursorIcon, RectangleIcon } from "../IconsSvgs/IconSvgs"
import { ArrowRightIcon, DiamondIcon, EraserIcon, LetterTextIcon, PencilIcon, Wind } from "lucide-react"
import { ToolBarItems } from "./toolBarItems"
import { SelectColors } from "./colors"
import { Shapes } from "../drawCanvas/getShapes"
import { drawShape, IselectedShape, selectedShape } from "../drawCanvas/drawShape"
import { drawExistingShape } from "../drawCanvas/drawExistingShape"
import { circle } from "../drawShape/circle"
// import { DrawCanva } from "./drawCanva"


export interface IAction {
    type: "text" | "rect" | "circle" | "pencile" | "line" | "pointer" | "dimond " | "erase" | "drag"
}

export type IColors = "rgba(255, 255, 255, 1)" | "rgba(239, 68, 68, 1)" | "rgba(249, 115, 22, 1)" | "rgba(59, 130, 246, 1)" | "rgba(34, 197, 94, 1)" | "rgba(0, 0, 0, 0.1)"


export interface IStyles {
    stroke: IColors
    background: IColors
    fill: "fill"
    strokeWidth: 2 | 3 | 4 | 5
}


export function MainCanva({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const dynamicCanvaRef = useRef<HTMLCanvasElement>(null);
    const staticCanvaRef = useRef<HTMLCanvasElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTool, setSelectedTool] = useState<IAction>({ type: "pointer" })
    const styleRef = useRef<HTMLDivElement>(null)
    const [isStyleChange, setStyleChange] = useState<boolean>(false)
    const Style = useRef<IStyles>({
        stroke: "rgba(255, 255, 255, 1)",
        background: "rgba(0, 0, 0, 0.1)",
        fill: "fill",
        strokeWidth: 3
    })
    const previousText = useRef<string>("")
    const action = useRef<IAction>({
        type: "pointer"
    })


    useEffect(() => {
        window.scrollTo({ left: 5000, top: 5000, behavior: "smooth" })
    }, [])


    useEffect(() => {
        if (dynamicCanvaRef.current && staticCanvaRef.current && styleRef.current) {
            // console.log("the drawing function is called ")
            initDraw(roomId, socket, dynamicCanvaRef.current, staticCanvaRef.current, action, textAreaRef, setSelectedTool, Style.current, styleRef.current)
        }

    }, [dynamicCanvaRef, staticCanvaRef, styleRef])


    useEffect(() => {
        action.current.type = selectedTool.type
        if (!dynamicCanvaRef.current) return
        if (!styleRef.current) return
        dynamicCanvaRef.current.style.display = selectedTool.type === "pointer" ? "none" : "block"
        styleRef.current.style.display = selectedTool.type === "pointer" ? "none" : "block"
    }, [selectedTool])


    useEffect(() => {
        if (isStyleChange && action.current.type === "pointer" && selectedShape.isSeletedShape) {
            existingShapes.forEach(x => {
                if (x === selectedShape.currentSelectedShape) {
                    console.log(selectedShape.currentSelectedShape)
                    x.stroke = Style.current.stroke
                    if (x.type === "circle" || x.type === "rect") {
                        x.background = Style.current.background
                        x.strokeWidth = Style.current.strokeWidth
                    }
                }
            })
            drawExistingShape(existingShapes, sCtx, Style.current)
            setStyleChange(false)
        }
    }, [isStyleChange])

    return <div className="w-max h-max scroll-smooth">
        <canvas className=" overflow-auto  overscroll-contain bg-black  " ref={staticCanvaRef} height={10000} width={10000}  ></canvas>
        <canvas className="absolute  top-0 left-0 hidden overflow-auto bg-transparent  overscroll-contain  " ref={dynamicCanvaRef} height={10000} width={10000} ></canvas>
        <SelectColors Style={Style.current} ref={styleRef} setStyleChange={setStyleChange} />
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        {/* <textarea ref={textAreaRef} className={`hidden  row-span-1 min-w-16 min-h-12  absolute   top-[5200px] left-[5200px]  outline-none resize-none overflow-hidden `} onChange={(e) => {
            // to increase and decrease the width of textarea accroding to contents
            if (previousText.current.length < e.currentTarget.value.length) {
                e.currentTarget.style.width = `${e.currentTarget.clientWidth + 8}px`
                previousText.current = e.currentTarget.value
            } else {
                e.currentTarget.style.width = `${e.currentTarget.clientWidth - 8}px`
                if (e.currentTarget.value.length <= 1) {
                    previousText.current = ""
                }

            }
            // console.log(e.currentTarget.scrollWidth)
            // e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`

        }}
        ></textarea>
        bg-[#121212] */}
    </div>
}


function ToolBar({ selectedTool, setSelectedTool }: {
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
            <ToolBarItems selectedTool={selectedTool.type === "line"} children={<ArrowRightIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "line" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "dimond "} children={<DiamondIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "dimond " })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "text"} children={<LetterTextIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "text" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "pencile"} children={<PencilIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "pencile" })
            }} />
            <ToolBarItems selectedTool={selectedTool.type === "erase"} children={<EraserIcon className="text-white h-5 " />} onClick={() => {
                setSelectedTool({ type: "erase" })
            }} />

        </div>
    </div>
}



