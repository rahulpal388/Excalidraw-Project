import { CodeSquare } from "lucide-react"
import { IActionType, IselectedShape } from "../drawCanvas/drawShape"
import { onLineShape } from "./lineShape"
import { isRectangleShape } from "./rectangleShape"



export function onMarkedShape(startX: number, startY: number, l1: number, l2: number, clientX: number, clientY: number, sCanva: HTMLCanvasElement): IActionType {
    const width = 8
    const height = 8

    const insideRectangle = isRectangleShape(startX + width, startY + (height / 2), l1, l2, clientX, clientY, "inside")
    const topLine = isRectangleShape(startX + width, startY + (height / 2) - 4, l1, 8, clientX, clientY, "inside")
    const rightLine = isRectangleShape(startX + width + l1, startY + height, 8, l2, clientX, clientY, "inside")
    const bottomLine = isRectangleShape(startX + width, startY + height + l2, l1, 8, clientX, clientY, "inside")
    const leftLine = isRectangleShape(startX, startY + height, 8, l2, clientX, clientY, "inside")
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

    return "none"
}