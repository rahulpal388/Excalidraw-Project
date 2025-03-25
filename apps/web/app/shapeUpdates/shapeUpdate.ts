import { clearCanvas } from "../drawCanvas/clearCanva";
import { drawExistingShape } from "../drawCanvas/drawExistingShape";
import { Shapes } from "../drawCanvas/getShapes";
import { IStyles } from "../components/MainComponent";
import { markSelectedShape } from "../drawCanvas/markSelectedShape";
import { IActionType } from "../drawCanvas/classDrawShape";


// first time when shape is drawn
export function CanvaShapeUpdate(sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, socket: WebSocket, existingShapes: Shapes[], Style: IStyles, shape: Shapes) {
    existingShapes.push(shape)
    clearCanvas(dCtx, dCanvas, "dymanic")
    clearCanvas(sCtx, sCanvas, "static")
    drawExistingShape(existingShapes, sCtx, Style)
}

// when the shape is resize or move
export function CanvaChangeShapeUpdate(sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, existingShapes: Shapes[], actionType: IActionType, shape: Shapes, Style: IStyles) {
    existingShapes.push(shape)
    clearCanvas(sCtx, sCanvas, "static")
    clearCanvas(dCtx, dCanvas, "dymanic")
    dCanvas.style.display = "none"
    drawExistingShape(existingShapes, sCtx, Style)
    actionType = "none"
    markSelectedShape(sCtx, shape, actionType)
}