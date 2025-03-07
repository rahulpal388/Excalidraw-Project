import { IActionType } from "../drawCanvas/drawShape";



export function circleDimension(startX: number, startY: number, radiusX: number, radiusY: number, clientX: number, clientY: number, where: IActionType, distanceMoveClick: { a: number, b: number }): {
    startX: number,
    startY: number,
    radiusX: number,
    radiusY: number,
    cursorType: "ew-resize" | "ns-resize" | "move"
} | null {
    console.log(startX, startY)
    console.log(distanceMoveClick)
    if (where === "move") {
        return {
            startX: clientX - distanceMoveClick.b,
            startY: clientY - distanceMoveClick.a,
            radiusX,
            radiusY,
            cursorType: "move"
        }
    }

    // why this is not working
    // if (where === "l-resize") {
    //     const newStartX = startX + radiusX
    //     const radius_X = Math.abs(clientX - newStartX) / 2;
    //     let start_X = clientX < newStartX ? clientX + radius_X : clientX - radius_X;
    //     return {
    //         startX: start_X,
    //         startY,
    //         radiusX: radius_X,
    //         radiusY
    //     }

    // }

    if (where === "l-resize" || where === "r-resize") {
        const newStartX = where === "l-resize" ? startX + radiusX : startX - radiusX
        const radius_X = Math.abs(clientX - newStartX) / 2;
        let start_X = clientX + (clientX < newStartX ? radius_X : - radius_X);
        return {
            startX: start_X,
            startY,
            radiusX: radius_X,
            radiusY,
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
            cursorType: "ns-resize"
        }

    }



    return null


}