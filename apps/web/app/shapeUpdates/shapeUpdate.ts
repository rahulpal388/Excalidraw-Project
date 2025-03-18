import { unescape } from "querystring";
import { clearCanvas } from "../drawCanvas/clearCanva";
import { drawExistingShape } from "../drawCanvas/drawExistingShape";
import { IselectedShape } from "../drawCanvas/drawShape";
import { Shapes } from "../drawCanvas/getShapes";
import { markSelectedShape } from "../drawCanvas/markSelectedShape";
import { IStyles } from "../components/MainComponent";


// first time when shape is drawn
export function CanvaShapeUpdate(sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, socket: WebSocket, existingShapes: Shapes[], shape: Shapes, selectedShape: IselectedShape, Style: IStyles) {
    existingShapes.push(shape)
    clearCanvas(dCtx, dCanvas, "dymanic")
    clearCanvas(sCtx, sCanvas, "static")
    drawExistingShape(existingShapes, sCtx, Style)
}

// when the shape is resize or move
export function CanvaChangeShapeUpdate(sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, existingShapes: Shapes[], shapeChange: IselectedShape, shape: Shapes, Style: IStyles) {

    existingShapes.push(shape)
    clearCanvas(sCtx, sCanvas, "static")
    clearCanvas(dCtx, dCanvas, "dymanic")
    drawExistingShape(existingShapes, sCtx, Style)
    shapeChange.actionType = "none"
    shapeChange.isSeletedShape = false
    shapeChange.currentSelectedShape = undefined
}