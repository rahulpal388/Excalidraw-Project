
import { circle } from "../drawShape/circle";
import { line } from "../drawShape/line";
import { rectangle } from "../drawShape/rectangle";
import { IActionType } from "./drawShape";
import { Shapes } from "./getShapes";





export function markSelectedShape(ctx: CanvasRenderingContext2D, selectedShape: Shapes, actionType: IActionType) {
    const x = selectedShape
    if (x.type === "rect") {
        mark(x.startX, x.startY, x.width, x.height, ctx, actionType)

    }
    if (x.type === "circle") {
        mark(x.startX - x.radiusX, x.startY - x.radiusY, 2 * x.radiusX, 2 * x.radiusY, ctx, actionType)
    }

    if (x.type === "arrow") {
        circle(x.startX, x.startY, 5, 5, ctx, "rgba(59, 130, 246, 1)", 1, "rgba(0, 0, 0, 0.1)")
        // circle((x.startX + x.endX) / 2, (x.startY + x.endY) / 2, 5, 5, ctx, "rgba(59, 130, 246, 1)", 2, "rgba(0, 0, 0, 0.1)")
        circle(x.endX + 5, x.endY + 5, 5, 5, ctx, "rgba(59, 130, 246, 1)", 1, "rgba(0, 0, 0, 0.1)")
    }
    if (x.type === "dimond") {
        mark(x.startX - x.width, x.startY, x.width - 5, x.height - 5, ctx, actionType)
    }

    // if (x.type === "text") {
    //     // we have to make the height dynamic depending upon the text
    //     mark(x.left - 10, x.top - 15, x.width + 14, 23, ctx, actionType)
    // }


}





function mark(startX: number, startY: number, l1: number, l2: number, ctx: CanvasRenderingContext2D, actionType: IActionType) {
    const width = l1 >= 0 ? 8 : -8;
    const height = l2 >= 0 ? 8 : -8;
    // console.log(l1, l2)
    // const sx1 = startX - 8
    // const sy1 = startY - 8
    // const x1 = sx1 + w
    // const y1 = sy1 + (h / 2)
    // const ex1 = x1 + width
    // const ey1 = y1
    // const sx2 = sx1+w+width
    // const sy2 = sy1
    // const x2 = ex1+(w/2)
    // const y2 = ey1+(h/2)
    // const ex2 = x2
    // const ey2 = y2+height
    // const sx3 = sx2
    // const sy3 = sy2+h+height
    // const x3 = x2-(w/2)
    // const y3 = y2+(h/2)
    // const ex3 = x3+width
    // const ey3 = y3

    startX = l1 >= 0 ? startX - 8 : startX + 8
    startY = l2 >= 0 ? startY - 8 : startY + 8


    const strokeStyle = "rgb(0, 0, 255)"

    // circle(startX + midLength, startY - 25, 5, 5, ctx, "rgba(59, 130, 246, 1)", 3, "rgba(0, 0, 0, .1)")
    rectangle(startX, startY, width, height, ctx, "rgba(34, 197, 94, 1)", 2, "rgba(0, 0, 0, 0.1)", "default")
    line(startX + width, startY + (height / 2), startX + width + l1, startY + height / 2, strokeStyle, ctx)
    rectangle(startX + width + l1, startY, width, height, ctx, "rgba(59, 130, 246, 1)", 2, "rgba(0, 0, 0, 0.1)", "default")
    line(startX + width + l1 + (width / 2), startY + height, startX + width + l1 + (width / 2), startY + width + l2, "rgb(0, 0, 255)", ctx)

    rectangle(startX + width + l1, startY + width + l2, width, height, ctx, "rgba(59, 130, 246, 1)", 2, "rgba(0, 0, 0, 0.1)", "default")
    line(startX + width + l1, startY + width + l2 + (width / 2), startX + width, startY + height + l2 + (height / 2), "rgb(0, 0, 255)", ctx)
    rectangle(startX, startY + height + l2, width, height, ctx, "rgba(59, 130, 246, 1)", 2, "rgba(0, 0, 0, 0.1)", "default")
    line(startX + (width / 2), startY + height + l2, startX + (width / 2), startY + height, "rgb(0, 0, 255)", ctx)


}