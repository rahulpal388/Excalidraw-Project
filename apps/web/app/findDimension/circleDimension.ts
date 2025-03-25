import { IActionType } from "../drawCanvas/drawShape";



export function circleDimension(startX: number, startY: number, radiusX: number, radiusY: number, clientX: number, clientY: number, where: IActionType, distanceMoveClick: { a: number, b: number }): {
    startX: number,
    startY: number,
    radiusX: number,
    radiusY: number,
    moveX: number,
    moveY: number,
    cursorType: "ew-resize" | "ns-resize" | "move" | "nesw-resize" | "nwse-resize"
} | null {

    if (where === "move") {
        return {
            startX: clientX - distanceMoveClick.a,
            startY: clientY - distanceMoveClick.b,
            radiusX,
            radiusY,
            moveX: clientX - distanceMoveClick.a,
            moveY: clientY - distanceMoveClick.b,
            cursorType: "move"
        }
    }


    if (where === "l-resize" || where === "r-resize") {
        const newStartX = where === "l-resize" ? startX + radiusX : startX - radiusX
        const radius_X = Math.abs(clientX - newStartX) / 2;
        let start_X = clientX + (clientX < newStartX ? radius_X : - radius_X);
        return {
            startX: start_X,
            startY,
            radiusX: radius_X,
            radiusY,
            moveX: start_X,
            moveY: startY,
            cursorType: "ew-resize"
        }

    }

    if (where === "t-resize" || where === "b-resize") {
        const newStartY = where === "t-resize" ? startY + radiusY : startY - radiusY
        const radius_Y = Math.abs(clientY - newStartY) / 2
        const start_Y = clientY + (clientY < newStartY ? radius_Y : -radius_Y)

        return {
            startX,
            startY: start_Y,
            radiusX,
            radiusY: radius_Y,
            moveX: startX,
            moveY: start_Y,
            cursorType: "ns-resize"
        }

    }


    if (where === "t-cl-resize" || where === "t-cr-resize" || where === "b-cl-resize" || where === "b-cr-resize") {
        const x = where === "t-cl-resize" || where === "b-cl-resize" ? startX + (radiusX) : startX - radiusX
        const y = where === "b-cl-resize" || where === "b-cr-resize" ? startY - (radiusY) : startY + (radiusY)
        const cursor = where === "t-cl-resize" ? "nwse-resize" : "nesw-resize"
        const radius_X = (clientX - x) / 2
        const radius_Y = (clientY - y) / 2
        const sx = radius_X <= 0 ? x - Math.abs(radius_X) : x + Math.abs(radius_X)
        const sy = radius_Y <= 0 ? y - Math.abs(radius_Y) : y + Math.abs(radius_Y)
        return {
            startX: Math.abs(sx),
            startY: Math.abs(sy),
            radiusX: Math.abs(radius_X),
            radiusY: Math.abs(radius_Y),
            moveX: sx,
            moveY: sy,
            cursorType: cursor
        }



    }

    // if (where === "b-cl-resize") {

    //     const x = startX + (radiusX)
    //     const y = startY - (radiusY)
    //     const radius_X = (clientX - x) / 2
    //     const radius_Y = (clientY - y) / 2
    //     const sx = radius_X <= 0 ? x - Math.abs(radius_X) : x + Math.abs(radius_X)
    //     const sy = radius_Y <= 0 ? y - Math.abs(radius_Y) : y + Math.abs(radius_Y)
    //     return {
    //         startX: Math.abs(sx),
    //         startY: Math.abs(sy),
    //         radiusX: Math.abs(radius_X),
    //         radiusY: Math.abs(radius_Y),
    //         moveX: sx,
    //         moveY: sy,
    //         cursorType: "nesw-resize"
    //     }
    // }


    return null


}