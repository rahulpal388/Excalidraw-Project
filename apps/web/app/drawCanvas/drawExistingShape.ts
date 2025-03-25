import { text } from "stream/consumers";
import { circle } from "../drawShape/circle";
import { dimond } from "../drawShape/dimond";
import { arrow, line } from "../drawShape/line";
import { rectangle } from "../drawShape/rectangle";
import { Shapes } from "./getShapes";
import { textDimension } from "../findDimension/textDimension";
import { inserText } from "../drawShape/text";
import { IStyles } from "../components/MainComponent";
import { circleDimension } from "../findDimension/circleDimension";



export function drawExistingShape(existingShapes: Shapes[], sCtx: CanvasRenderingContext2D | null, Style: IStyles) {
    if (!sCtx) return
    existingShapes.map(shape => {
        if (shape.type === "rect" && shape.display) {
            rectangle(shape.startX, shape.startY, shape.width, shape.height, sCtx, shape.stroke, shape.strokeWidth, shape.background, "rounded")
        }
        if (shape.type === "circle" && shape.display) {
            circle(shape.startX, shape.startY, shape.radiusX, shape.radiusY, sCtx, shape.stroke, shape.strokeWidth, shape.background)
        }
        if (shape.type === "arrow" && shape.display) {
            arrow(shape.startX, shape.startY, shape.endX, shape.endY, shape.stroke, shape.strokeWidth, sCtx)
        }
        if (shape.type === "dimond" && shape.display) {
            dimond(shape.startX, shape.startY, shape.width, shape.height, shape.stroke, shape.strokeWidth, shape.background, sCtx)
        }
        // if (shape.type === "text" && shape.display) {
        //     inserText(sCtx, shape.text, shape.top, shape.left)
        // }
        // if (shape.type === "pencile" && shape.display) {
        //     sCtx.beginPath()
        //     sCtx.moveTo(shape.startX, shape.startY)
        //     shape.endDimension.map(x => {
        //         sCtx.lineTo(x.endX, x.endY)
        //         sCtx.stroke()
        //     })

        // }
    })

}