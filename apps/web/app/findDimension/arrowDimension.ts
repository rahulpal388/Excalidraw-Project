import { IActionType } from "../drawCanvas/classDrawShape";
import { findDistance } from "../drawCanvas/findDistance";



export function arrowDimension(startX: number, startY: number, endX: number, endY: number, clientX: number, clientY: number, actionType: IActionType, distanceMoveClick: { a: number, b: number }): {
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    cursorType: "ew-resize" | "ns-resize" | "move" | "nesw-resize" | "nwse-resize" | "pointer"
} | null {

    const radian = Math.atan2(endY - startY, endX - startX)
    const degree = (radian * 180) / Math.PI

    if (actionType === "move") {
        const length = findDistance(startX, startY, endX, endY)
        const d = findDistance(startX, startY, clientX, clientY)
        const sx = clientX - distanceMoveClick.a
        const sy = clientY - distanceMoveClick.b
        const ex = sx + (length * Math.cos(radian))
        const ey = sy + (length * Math.sin(radian))

        return {
            startX: sx,
            startY: sy,
            endX: ex,
            endY: ey,
            cursorType: "move"
        }
    }

    if (actionType === "r-resize") {
        const length = findDistance(startX, startY, clientX, clientY)
        const radian = Math.atan2(clientY - startY, clientX - startX)
        const ex = startX + (length * Math.cos(radian))
        const ey = startY + (length * Math.sin(radian))
        return {
            startX,
            startY,
            endX: ex,
            endY: ey,
            cursorType: "pointer"
        }
    }

    if (actionType === "l-resize") {
        const length = findDistance(endX, endY, clientX, clientY)
        const radian = Math.atan2(clientY - endY, clientX - endX)
        const sx = endX + (length * Math.cos(radian))
        const sy = endY + (length * Math.sin(radian))
        console.log(`clinetX is ${clientX}`)
        console.log(`clientY is ${clientY}`)
        console.log(`startX is ${startX}`)
        console.log(`startY is ${startY}`)
        console.log(`endX is ${endX}`)
        console.log(`endY is ${endY}`)
        return {
            startX: endX,
            startY: endY,
            endX: sx,
            endY: sy,
            cursorType: "pointer"
        }
    }


    return null
}