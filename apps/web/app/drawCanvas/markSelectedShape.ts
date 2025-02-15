import { circle } from "../drawShape/circle";
import { line } from "../drawShape/line";
import { rectangle } from "../drawShape/rectangle";
import { clearCanvas } from "./clearCanva";
import { Shapes } from "./getShapes";



export function markSelecteShape(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, selectedShape: Shapes[], existingShapes: Shapes[]) {
    selectedShape.map(x => {
        clearCanvas(existingShapes, ctx, canvas)
        ctx.strokeStyle = "rgb(0, 0, 255)"
        if (x.type === "rect") {
            mark(x.startX - 10, x.startY - 10, x.width + 4, x.height + 4, ctx)
        }
        if (x.type === "circle") {
            mark(x.startX - x.radiusX - 7, x.startY - x.radiusY - 7, 2 * x.radiusX - 2, 2 * x.radiusY - 2, ctx)
        }
        if (x.type === "dimond") {
            mark(x.startX - (x.distance / 2) - 4, x.startY - 4, x.distance - 5, x.distance - 5, ctx)
        }
        if (x.type === "line") {
            circle(x.startX, x.startY, 5, 5, ctx)
            circle((x.startX + x.endX) / 2, (x.startY + x.endY) / 2, 5, 5, ctx)
            circle(x.endX, x.endY, 5, 5, ctx)
        }
    })
}





function mark(startX: number, startY: number, l1: number, l2: number, ctx: CanvasRenderingContext2D) {
    const width = 8;
    const height = 8;
    const midLength = (16 + l1) / 2

    const strokeStyle = "rgb(0, 0, 255)"

    circle(startX + midLength, startY - 25, 5, 5, ctx)
    rectangle(startX, startY, width, height, strokeStyle, ctx)
    line(startX + width, startY + (height / 2), startX + width + l1, startY + height / 2, ctx)
    rectangle(startX + width + l1, startY, width, height, strokeStyle, ctx)
    line(startX + width + l1 + (width / 2), startY + height, startX + width + l1 + (width / 2), startY + width + l2, ctx)
    rectangle(startX + width + l1, startY + width + l2, width, height, strokeStyle, ctx)
    line(startX + width + l1, startY + width + l2 + (width / 2), startX + width, startY + height + l2 + (height / 2), ctx)
    rectangle(startX, startY + height + l2, width, height, strokeStyle, ctx)
    line(startX + (width / 2), startY + height + l2, startX + (width / 2), startY + height, ctx)
}