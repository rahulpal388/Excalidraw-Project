"use client"
import React, { useEffect, useRef, useState } from "react"
import { existingShapes, shape } from "../drawCanvas/classDrawShape"
import { SelectColors } from "./colors"
import { drawExistingShape } from "../drawCanvas/drawExistingShape"
import { Draw, isSelected } from "../drawCanvas/classDrawShape"
import { ToolBar } from "./toolBar"
import { clearCanvas } from "../drawCanvas/clearCanva"


export interface IAction {
    type: "text" | "rect" | "circle" | "pencile" | "line" | "pointer" | "dimond " | "erase" | "drag" | "arrow"
}

export type IColors = "rgba(255, 255, 255, 1)" | "rgba(239, 68, 68, 1)" | "rgba(249, 115, 22, 1)" | "rgba(59, 130, 246, 1)" | "rgba(34, 197, 94, 1)" | "rgba(0, 0, 0, 0.1)"


export interface IStyles {
    stroke: IColors
    background: IColors
    fill: "fill"
    strokeWidth: 1 | 2 | 3 | 4 | 5
}


export function MainCanva({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const dynamicCanvaRef = useRef<HTMLCanvasElement>(null);
    const staticCanvaRef = useRef<HTMLCanvasElement>(null);
    const dCanva = useRef<HTMLCanvasElement>(null)
    const sCanva = useRef<HTMLCanvasElement>(null)
    const sCtx = useRef<CanvasRenderingContext2D>(null)
    const dCtx = useRef<CanvasRenderingContext2D>(null)
    const [selectedTool, setSelectedTool] = useState<IAction>({ type: "pointer" })
    const styleRef = useRef<HTMLDivElement>(null)
    const [isStyleChange, setStyleChange] = useState<boolean>(false)
    const Style = useRef<IStyles>({
        stroke: "rgba(255, 255, 255, 1)",
        background: "rgba(0, 0, 0, 0.1)",
        fill: "fill",
        strokeWidth: 3
    })
    const action = useRef<IAction>({
        type: "pointer"
    })


    useEffect(() => {
        window.scrollTo({ left: 5000, top: 5000, behavior: "smooth" })
    }, [])


    useEffect(() => {
        if (dynamicCanvaRef.current && staticCanvaRef.current && styleRef.current) {
            dCanva.current = dynamicCanvaRef.current
            sCanva.current = staticCanvaRef.current
            sCtx.current = sCanva.current.getContext("2d")
            dCtx.current = dCanva.current.getContext("2d")
            if (!dCtx.current) return
            if (!sCtx.current) return
            sCtx.current.fillStyle = "rgba(18,18,18,1)"
            dCtx.current.fillStyle = "rgba(255, 255, 255, 0)"
            const drawObj = new Draw(sCanva.current, dCanva.current, sCtx.current, dCtx.current, action.current, Style.current, setSelectedTool, socket, styleRef)

        }

    }, [dynamicCanvaRef, staticCanvaRef, styleRef])


    useEffect(() => {
        action.current.type = selectedTool.type
        if (!dynamicCanvaRef.current) return
        if (!styleRef.current) return
        if (isSelected.value && selectedTool.type !== "pointer") {
            if (!sCanva.current) return
            clearCanvas(sCtx.current, sCanva.current, "static")
            drawExistingShape(existingShapes, sCtx.current, Style.current)
            isSelected.value = false
        }
        dynamicCanvaRef.current.style.display = selectedTool.type === "pointer" ? "none" : "block"
        styleRef.current.style.display = selectedTool.type === "pointer" ? "none" : "block"
    }, [selectedTool])


    useEffect(() => {
        if (isStyleChange && action.current.type === "pointer" && shape.value) {
            console.log("changing the style")
            existingShapes.forEach(x => {
                if (x.id === shape.value.id) {
                    x.stroke = Style.current.stroke
                    if (x.type === "circle" || x.type === "rect") {
                        x.background = Style.current.background
                        x.strokeWidth = Style.current.strokeWidth
                    }
                }
            })
            drawExistingShape(existingShapes, sCtx.current, Style.current)
            setStyleChange(false)
        }
    }, [isStyleChange])

    return <div className="w-max h-max scroll-smooth">
        <canvas className=" overflow-auto  overscroll-contain bg-black  " ref={staticCanvaRef} height={10000} width={10000}  ></canvas>
        <canvas className="absolute  top-0 left-0 hidden overflow-auto bg-transparent  overscroll-contain  " ref={dynamicCanvaRef} height={10000} width={10000} ></canvas>
        <SelectColors Style={Style.current} ref={styleRef} setStyleChange={setStyleChange} />
        <ToolBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
    </div>
}




