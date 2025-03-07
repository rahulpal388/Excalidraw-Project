import { IActionType } from "../drawCanvas/drawShape"


export function rectangleDimension(startX: number, startY: number, width: number, height: number, clientX: number, clientY: number, where: IActionType, distanceMoveClick: { a: number, b: number }): {
    startX: number,
    startY: number,
    width: number,
    height: number,
    cursorType: "ew-resize" | "ns-resize" | "move"
} | null {

    if (where === "l-resize" || where === "r-resize") {
        const startX1 = where === "l-resize" ? startX + width : startX
        const w = clientX - startX1
        const x = w > 0 ? startX1 : startX1 - Math.abs(w)
        return {
            startX: x,
            startY: startY,
            width: Math.abs(w),
            height: height,
            cursorType: "ew-resize"
        }
    }

    if (where === "t-resize" || where === "b-resize") {
        const startY1 = where === "t-resize" ? startY + height : startY
        const h = clientY - startY1
        const x = h > 0 ? startY1 : startY1 - Math.abs(h)

        return {
            startX,
            startY: x,
            width,
            height: Math.abs(h),
            cursorType: "ns-resize"
        }

    }


    if (where === "move") {
        const startX = clientX - distanceMoveClick.b
        const startY = clientY - distanceMoveClick.a
        return {
            startX,
            startY,
            width,
            height,
            cursorType: "move"

        }

    }
    return null
}