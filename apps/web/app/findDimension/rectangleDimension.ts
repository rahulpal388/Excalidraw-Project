import { IActionType } from "../drawCanvas/drawShape"


export function rectangleDimension(startX: number, startY: number, width: number, height: number, clientX: number, clientY: number, where: IActionType, distanceMoveClick: { a: number, b: number }): {
    startX: number,
    startY: number,
    x: number,
    y: number
    width: number,
    height: number,
    markX: number,
    markY: number,
    markHeight: number,
    markWidth: number
    cursorType: "ew-resize" | "ns-resize" | "move" | "nesw-resize" | "nwse-resize"
} | null {


    if (where === "l-resize" || where === "r-resize") {
        const startX1 = where === "l-resize" ? startX + width : startX
        const w = clientX - startX1
        const x = w > 0 ? startX1 : startX1 - Math.abs(w)
        return {
            startX: x,
            startY: startY,
            x: x,
            y: startY,
            markX: x,
            markY: startY,
            width: Math.abs(w),
            height: height,
            markHeight: height,
            markWidth: Math.abs(w),
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
            x: startX,
            y: x,
            markX: startX,
            markY: x,
            width,
            markHeight: Math.abs(h),
            markWidth: width,
            height: Math.abs(h),
            cursorType: "ns-resize"
        }

    }

    if (where === "t-cl-resize" || where === "t-cr-resize" || where === "b-cl-resize" || where === "b-cr-resize") {
        const sx = where === "t-cl-resize" || where === "b-cl-resize" ? (startX + width) : startX
        const cursor = where === "t-cl-resize" || where === "b-cr-resize" ? "nwse-resize" : "nesw-resize"
        const sy = where === "t-cl-resize" || where === "t-cr-resize" ? (startY + height) : startY
        const w = clientX - sx
        const h = clientY - sy
        const markX = w <= 0 ? sx - Math.abs(w) : sx
        const markY = h <= 0 ? sy - Math.abs(h) : sy
        const x = w <= 0 ? sx - Math.abs(w) : sx
        const y = h <= 0 ? sy - Math.abs(h) : sy

        return {
            startX: sx,
            startY: sy,
            x,
            y,
            height: h,
            width: w,
            markX,
            markY,
            markHeight: Math.abs(h),
            markWidth: Math.abs(w),
            cursorType: cursor
        }

    }
    // if (where === "b-cl-resize" || where === "b-cr-resize") {
    //     const sx = where === "b-cl-resize" ? startX + width : startX
    //     const cursor = where === "b-cl-resize" ? "nesw-resize" : "nwse-resize"
    //     const w = clientX - sx
    //     const h = clientY - startY
    //     const markX = w <= 0 ? sx - Math.abs(w) : sx
    //     const markY = h <= 0 ? startY - Math.abs(h) : startY
    //     const x = w <= 0 ? sx - Math.abs(w) : sx
    //     const y = h <= 0 ? startY - Math.abs(h) : startY
    //     return {
    //         startX: sx,
    //         startY: startY,
    //         x,
    //         y,
    //         width: w,
    //         height: h,
    //         markX,
    //         markY,
    //         markHeight: Math.abs(h),
    //         markWidth: Math.abs(w),
    //         cursorType: cursor
    //     }

    // }

    if (where === "move") {
        const startX = clientX - distanceMoveClick.b
        const startY = clientY - distanceMoveClick.a
        return {
            startX,
            startY,
            x: startX,
            y: startY,
            markX: startX,
            markY: startY,
            width,
            height,
            markHeight: height,
            markWidth: width,
            cursorType: "move"

        }

    }
    return null
}