import { text } from "stream/consumers";
import { circle } from "../drawShape/circle";
import { dimond } from "../drawShape/dimond";
import { line } from "../drawShape/line";
import { rectangle } from "../drawShape/rectangle";
import { Shapes } from "./getShapes";
import { textDimension } from "../findDimension/textDimension";
import { inserText } from "../drawShape/text";
import { IStyles } from "../components/MainComponent";



export function drawExistingShape(existingShapes: Shapes[], sCtx: CanvasRenderingContext2D,Style:IStyles) {
    existingShapes.map(shape => {
        if (shape.type === "rect" && shape.display) {
            rectangle(shape.startX, shape.startY, shape.width, shape.height, sCtx,shape.stroke,shape.strokeWidth,shape.background ,"rounded")
        }
        if (shape.type === "circle" && shape.display) {
            circle(shape.startX, shape.startY, shape.radiusX, shape.radiusY,  sCtx,shape.stroke,shape.strokeWidth,shape.background)
        }
        if (shape.type === "line" && shape.display) {
            line(shape.startX, shape.startY, shape.endX, shape.endY, shape.stroke, sCtx)
        }
        if (shape.type === "dimond" && shape.display) {
            dimond(shape.startX, shape.startY, shape.distance, shape.stroke, sCtx)
        }
        if (shape.type === "text" && shape.display) {
            inserText(sCtx, shape.text, shape.top, shape.left)
        }
        if (shape.type === "pencile" && shape.display) {
            sCtx.beginPath()
            sCtx.moveTo(shape.startX, shape.startY)
            shape.endDimension.map(x => {
                sCtx.lineTo(x.endX, x.endY)
                sCtx.stroke()
            })

        }
    })

}