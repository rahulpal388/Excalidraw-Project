import { CodeSquare } from "lucide-react"
import { IActionType, IselectedShape } from "../drawCanvas/drawShape"
import { onLineShape } from "./lineShape"
import { isRectangleShape, onRectangleShape } from "./rectangleShape"
import { onCircleShape } from "./circleShape"
import { IStyles } from "../components/MainComponent"


export function onMarkedShape(startX: number, startY: number, l1: number, l2: number, clientX: number, clientY: number, sCanva: HTMLCanvasElement): IActionType {
    const width = 8
    const height = 8
    startX = l1 > 0 ? startX - 8 : startX
    startY = l2 > 0 ? startY - 8 : startY
    const insideRectangle = isRectangleShape(startX + width, startY + (height / 2), l1, l2, clientX, clientY, "inside")
    const topLine = isRectangleShape(startX + width, startY + (height / 2) - 4, l1, 8, clientX, clientY, "inside")
    const rightLine = isRectangleShape(startX + width + l1, startY + height, 8, l2, clientX, clientY, "inside")
    const bottomLine = isRectangleShape(startX + width, startY + height + l2, l1, 8, clientX, clientY, "inside")
    const leftLine = isRectangleShape(startX, startY + height, 8, l2, clientX, clientY, "inside")
    const t_cl_resize = isRectangleShape(startX, startY, width, height, clientX, clientY, "inside")
    const t_cr_resize = isRectangleShape(startX + width + l1, startY, width, height, clientX, clientY, "inside")
    const b_cr_resize = isRectangleShape(startX + width + l1, startY + width + l2, width, height, clientX, clientY, "inside")
    const b_cl_resize = isRectangleShape(startX, startY + height + l2, width, height, clientX, clientY, "inside")
    if (insideRectangle) {
        sCanva.style.cursor = "move"
        return "move"
    }
    if (leftLine) {
        sCanva.style.cursor = "ew-resize"
        return "l-resize"
    }
    if (topLine) {
        sCanva.style.cursor = "ns-resize"
        return "t-resize"

    }
    if (rightLine) {
        sCanva.style.cursor = "ew-resize"
        return "r-resize"

    }
    if (bottomLine) {
        sCanva.style.cursor = "ns-resize"
        return "b-resize"

    }

    if (t_cl_resize) {
        sCanva.style.cursor = "nwse-resize"
        return "t-cl-resize"
    }
    if (t_cr_resize) {
        sCanva.style.cursor = "nesw-resize"
        return "t-cr-resize"
    }
    if (b_cr_resize) {
        sCanva.style.cursor = "nwse-resize"
        return "b-cr-resize"
    }
    if (b_cl_resize) {
        sCanva.style.cursor = "nesw-resize"
        return "b-cl-resize"
    }

    return "none"
}


export function onMarkedLine(startX: number, startY: number, endX: number, endY: number, clientX: number, clientY: number, sCanvas: HTMLCanvasElement, style: IStyles): IActionType {

    const onLine = onLineShape(startX, startY, endX, endY, clientX, clientY)
    console.log("inside onMarkedShape")
    const onLeftCircle = onCircleShape({
        id: 0,
        type: 'circle',
        startX,
        startY,
        radiusX: 5,
        radiusY: 5,
        stroke: style.stroke,
        strokeWidth: 2,
        background: style.background,
        display: true,
        selected: true
    }, clientX, clientY, "inside")
    const onRightCircle = onCircleShape({
        id: 0,
        type: 'circle',
        startX: endX + 5,
        startY: endY + 5,
        radiusX: 5,
        radiusY: 5,
        stroke: style.stroke,
        strokeWidth: 2,
        background: style.background,
        display: true,
        selected: true
    }, clientX, clientY, "inside")



    if (onLine) {
        sCanvas.style.cursor = "move"
        return "move"

    }

    if (onLeftCircle || onRightCircle) {
        sCanvas.style.cursor = "pointer"
        return onLeftCircle ? "l-resize" : "r-resize"
    }

    return "none"
}


