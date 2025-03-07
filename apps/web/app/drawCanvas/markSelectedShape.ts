
import { circle } from "../drawShape/circle";
import { line } from "../drawShape/line";
import { rectangle } from "../drawShape/rectangle";
import { Shapes } from "./getShapes";





export function markSelectedShape(ctx: CanvasRenderingContext2D, selectedShape: Shapes) {
    const x = selectedShape
    if (x.type === "rect") {
        mark(x.startX - 9, x.startY - 9, x.width + 1, x.height + 1, ctx)

    }
    if (x.type === "circle") {
        mark(x.startX - x.radiusX - 7, x.startY - x.radiusY - 7, 2 * x.radiusX - 2, 2 * x.radiusY - 2, ctx)
    }
    if (x.type === "dimond") {
        mark(x.startX - (x.distance / 2) - 4, x.startY - 4, x.distance - 5, x.distance - 5, ctx)
    }
    if (x.type === "line") {
        circle(x.startX, x.startY, 5, 5, "rgb(0, 0, 255)", ctx)
        circle((x.startX + x.endX) / 2, (x.startY + x.endY) / 2, 5, 5, "rgb(0, 0, 255)", ctx)
        circle(x.endX, x.endY, 5, 5, "rgb(0, 0, 255)", ctx)
    }
    if (x.type === "text") {
        // we have to make the height dynamic depending upon the text
        mark(x.left - 10, x.top - 15, x.width + 14, 23, ctx)
    }


}





function mark(startX: number, startY: number, l1: number, l2: number, ctx: CanvasRenderingContext2D) {
    const width = 8;
    const height = 8;
    const midLength = (16 + l1) / 2

    const strokeStyle = "rgb(0, 0, 255)"

    circle(startX + midLength, startY - 25, 5, 5, strokeStyle, ctx)
    rectangle(startX, startY, width, height, strokeStyle, ctx, "default")
    line(startX + width, startY + (height / 2), startX + width + l1, startY + height / 2, strokeStyle, ctx)
    rectangle(startX + width + l1, startY, width, height, strokeStyle, ctx, "default")
    line(startX + width + l1 + (width / 2), startY + height, startX + width + l1 + (width / 2), startY + width + l2, "rgb(0, 0, 255)", ctx)

    rectangle(startX + width + l1, startY + width + l2, width, height, strokeStyle, ctx, "default")
    line(startX + width + l1, startY + width + l2 + (width / 2), startX + width, startY + height + l2 + (height / 2), "rgb(0, 0, 255)", ctx)
    rectangle(startX, startY + height + l2, width, height, strokeStyle, ctx, "default")
    line(startX + (width / 2), startY + height + l2, startX + (width / 2), startY + height, "rgb(0, 0, 255)", ctx)

}