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
            rectangle(shape.startX, shape.startY, shape.width, shape.height, shape.strokeStyle, ctx)
        }
        if (shape.type === "circle" && shape.display) {
            circle(shape.startX, shape.startY, shape.radiusX, shape.radiusY, shape.strokeStyle, ctx)
        }
        if (shape.type === "line" && shape.display) {
            line(shape.startX, shape.startY, shape.endX, shape.endY, shape.strokeStyle, ctx)
        }
        if (shape.type === "dimond") {
            dimond(shape.startX, shape.startY, shape.distance, shape.strokeStyle, ctx)
        }
        if (shape.type === "text" && shape.display) {
            console.log("called")
            ctx.font = `16px sans-serif`
            ctx.fillStyle = "white"
            ctx.fillText(shape.text, shape.x, shape.y + 5)
        }
        if (shape.type === "pencile" && shape.display) {
            ctx.beginPath()
            ctx.moveTo(shape.startX, shape.startY)
            shape.endDimension.map(x => {
                ctx.lineTo(x.endX, x.endY)
                ctx.stroke()
            })

        }
    })

}
