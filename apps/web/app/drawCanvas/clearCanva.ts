import { circle } from "../drawShape/circle"
import { line } from "../drawShape/line"
import { rectangle } from "../drawShape/rectangle"
import { Shapes } from "./getShapes"
import { dimond } from "../drawShape/dimond"

export function clearCanvas(existingShapes: Shapes[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgb(18,18,18)"
    ctx.strokeStyle = "rgb(211, 211, 211)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    existingShapes.map(shape => {
        if (shape.type === "rect" && shape.display) {
            rectangle(shape.startX, shape.startY, shape.width, shape.height, "rgb(211, 211, 211)", ctx)
        }
        if (shape.type === "circle" && shape.display) {
            circle(shape.startX, shape.startY, shape.radiusX, shape.radiusY, ctx)
        }
        if (shape.type === "line" && shape.display) {
            line(shape.startX, shape.startY, shape.endX, shape.endY, ctx)
        }
        if (shape.type === "dimond") {
            dimond(shape.startX, shape.startY, shape.distance, "rgb(211, 211, 211)", ctx)
        }
    })

}
