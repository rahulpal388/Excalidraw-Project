import { unescape } from "querystring";
import { clearCanvas } from "../drawCanvas/clearCanva";
import { drawExistingShape } from "../drawCanvas/drawExistingShape";
import { IselectedShape } from "../drawCanvas/drawShape";
import { Shapes } from "../drawCanvas/getShapes";


// first time when shape is drawn
export function CanvaShapeUpdate(sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, socket: WebSocket, existingShapes: Shapes[], shape: Shapes) {
    existingShapes.push(shape)
    clearCanvas(sCtx, sCanvas, "static")
    clearCanvas(dCtx, dCanvas, "dymanic")
    drawExistingShape(existingShapes, sCtx)


    // send the data to WebSocket 
    // WsSend(socket,{
    //     type:"Chat",
    //     payload:{
    //         roomId:1,
    //         shapes:JSON.stringify(shape)
    //     }
    // })
}

// when the shape is resize or move
export function CanvaChangeShapeUpdate(sCtx: CanvasRenderingContext2D, sCanvas: HTMLCanvasElement, dCtx: CanvasRenderingContext2D, dCanvas: HTMLCanvasElement, existingShapes: Shapes[], shapeChange: IselectedShape, shape: Shapes) {

    existingShapes.push(shape)
    clearCanvas(sCtx, sCanvas, "static")
    clearCanvas(dCtx, dCanvas, "dymanic")
    dCanvas.style.display = "none"
    drawExistingShape(existingShapes, sCtx)
    shapeChange.actionType = "none"
    shapeChange.isSeletedShape = false
    shapeChange.currentSelectedShape = undefined
}