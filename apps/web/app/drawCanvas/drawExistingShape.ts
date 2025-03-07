import { circle } from "../drawShape/circle";
import { dimond } from "../drawShape/dimond";
import { line } from "../drawShape/line";
import { rectangle } from "../drawShape/rectangle";
import { Shapes } from "./getShapes";



export function drawExistingShape(existingShapes: Shapes[], sCtx: CanvasRenderingContext2D) {
    existingShapes.map(shape => {
        if (shape.type === "rect" && shape.display) {
            rectangle(shape.startX, shape.startY, shape.width, shape.height, shape.strokeStyle, sCtx, "rounded")
        }
        if (shape.type === "circle" && shape.display) {
            circle(shape.startX, shape.startY, shape.radiusX, shape.radiusY, shape.strokeStyle, sCtx)
        }
        if (shape.type === "line" && shape.display) {
            line(shape.startX, shape.startY, shape.endX, shape.endY, shape.strokeStyle, sCtx)
        }
        if (shape.type === "dimond" && shape.display) {
            dimond(shape.startX, shape.startY, shape.distance, shape.strokeStyle, sCtx)
        }
        if (shape.type === "text" && shape.display) {
            sCtx.font = `16px sans-serif`
            sCtx.fillStyle = "white"
            sCtx.fillText(shape.text, shape.left, shape.top + 5)
        }
        if (shape.type === "pencile" && shape.display) {
            sCtx.beginPath()
            sCtx.strokeStyle = shape.strokeStyle
            sCtx.moveTo(shape.startX, shape.startY)
            shape.endDimension.map(x => {
                sCtx.lineTo(x.endX, x.endY)
                sCtx.stroke()
            })

        }
    })

}