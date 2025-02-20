import { IShapeType } from "../components/MainCanva";
import { clearCanvas } from "./clearCanva";
import { drawShape } from "./drawShape";
import { getExistingStrokes, Shapes } from "./getShapes";



export async function initDraw(roomId: string, socket: WebSocket, canvas: HTMLCanvasElement, shapeType: IShapeType, textAreaRef: HTMLTextAreaElement) {

    let existingShapes: Shapes[] = await getExistingStrokes("chats")

    const ctx = canvas.getContext("2d");

    if (!ctx) return

    socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const message = JSON.parse(data.stroke)
        if (data.type == "CHAT") {
            const shape = message
            existingShapes.push(shape);
            clearCanvas(existingShapes, ctx, canvas);
        }
    }


    clearCanvas(existingShapes, ctx, canvas);
    drawShape({ canvas, ctx, shapeType, existingShapes, socket, roomId, textAreaRef })

}







